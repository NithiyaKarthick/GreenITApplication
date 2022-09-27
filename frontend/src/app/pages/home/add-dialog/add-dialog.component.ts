import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {OrderService} from "../../../services/order.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { from } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { orderData } from 'src/app/interfaces/order';
 

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  title?: string;
  nextId: any;
  actionBtn:string = "Save";
  dialogTitle:string = "Add Order";
   orderItems: orderData[] = [];
   action : string;

  //Form Validators for the form controls
    orderForm = this.formBuilder.group({
    name: ['', [Validators.required,Validators.maxLength(50)]],
    state: ['', [Validators.required,Validators.maxLength(50)]],
    zip: ['', [Validators.required,Validators.pattern("^[0-9]*$"),
    Validators.minLength(5), Validators.maxLength(9)]],
    amount: ['', [Validators.required]],
    qty: ['', [Validators.required]],
    item: ['', [Validators.required]]
  });

  public formError = (controlName: string, errorName: string) =>{
    return this.orderForm.controls[controlName].hasError(errorName);
    }
   
  route: any;

    /**Allows the user to type only numbers for Number Fields like Zip,Quantity */
    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
   
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    // Allows Only AlphaNumeric
  keyPressAlphaNumeric(event : any) {

    var input = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(input)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Allows Only Numbers with Decimals for fields like amount
  keyPressNumbersDecimal(event : any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
   
  constructor(private formBuilder : FormBuilder,
    private dataservice: OrderService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogueRef:MatDialogRef<AddDialogComponent>) {
      this.orderItems = data.orderItems;
      this.action = data.action;
      this.editData = data.row;
     }

  ngOnInit(): void {
 
     if(this.action === "edit"){
      this.actionBtn= "Update";
      this.dialogTitle = "Edit Order";
      this.orderForm.controls['name'].setValue(this.editData.name);
      this.orderForm.controls['state'].setValue(this.editData.state);
      this.orderForm.controls['zip'].setValue(this.editData.zip);
      this.orderForm.controls['amount'].setValue(this.editData.amount);
      this.orderForm.controls['qty'].setValue(this.editData.qty);
      this.orderForm.controls['item'].setValue(this.editData.item);
    }
     
   
  }

  
  /**
   * Method to generate Order Id 
   */
   getNextId() {
    let collections :any = [];
    if(this.orderItems.length == 0) {
      return 1;
    }
    const source = from(this.orderItems);
    const ids = source.pipe(pluck('id'));
    ids.subscribe((val:any) => collections.push(parseInt(val)));
    return Math.max(...collections) + 1;
  
  }

  /** 
  * add the new order to the file by calling the addOrderData service
  */
  saveOrder() {
    console.log(this.orderForm.value);
    let formValue = this.orderForm.value;
      
    if(this.action === "add")
    {
      if(this.orderForm.valid){
        this.nextId = this.getNextId();
        formValue['id'] = this.nextId;
        this.dataservice.addOrderData(formValue)
        .subscribe({
          next: res => {
            alert("Order saved successfully");
            this.orderForm.reset();
            this.dialogueRef.close(formValue);
            },
            error:()=>{
              alert("Error saving the order ");
              this.dialogueRef.close();
            }
          })
      }
    }
    else{
      this.updateOrder();
    }
  }

  /** if the order is edited by the user
  *in the UI and saved, then updateOrder API is called
  */
  updateOrder()
  {
    console.log("enter update");
     console.log( this.orderForm.value);
     let formValue = this.orderForm.value;
     formValue['id'] = this.editData.id;
     this.dataservice.updateOrderData({
      index: this.editData.id,
      data: formValue
    })
    .subscribe({
      next:(res)=>{
        alert("Product updated Successfully");
        let formValue = this.orderForm.value;
        formValue['id'] = this.editData.id;
        this.orderForm.reset();
        this.dialogueRef.close(formValue);
        
      },
      error:()=>{
        alert("Error while updating the record");
      }
     
    });
  }

}
