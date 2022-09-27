import { Component, OnInit, TemplateRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {OrderService} from "../../services/order.service";
import { orderData } from '../../interfaces/order';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bsModalRef?: BsModalRef;
  public orderItems: orderData[] = [];
  selectedItem: any = {};

  displayedColumns: string[] = ['id', 'name', 'state', 'zip','amount','qty','item','action'];
  dataSource !: MatTableDataSource<orderData>;

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private dataservice: OrderService,
    private dialog : MatDialog
  ) { }

  openDialog(action : string) {

    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width ='30%';
     dialogConfig.data = {
     orderItems : this.orderItems,
     action :action
    };
   
    const dialogRef= this.dialog.open(AddDialogComponent, dialogConfig);

    // Subscribe when the dialog box closes
    dialogRef.afterClosed().subscribe(
      (res)=>{
        // Receive data from dialog component
        // res contains data sent from the dialog
      
        this.orderItems.push(res);
        console.log(this.orderItems);
        this.dataSource = new MatTableDataSource<orderData>(this.orderItems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
         
      }
  );

    
  }

  /**
   * Order details are prefetched and loaded
   */
  ngOnInit(): void {
  
  this.orderItems  =   this.route.snapshot.data['data'];
  this.dataSource = new MatTableDataSource<orderData>(this.orderItems);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
   
  }

  ngAfterViewInit()
  {
  
     this.dataSource = new MatTableDataSource<orderData>(this.orderItems);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editOrder(row : any){
    const editDialogConfig = new MatDialogConfig();
    
    editDialogConfig.width ='30%';
    editDialogConfig.data = {
     orderItems : this.orderItems,
     action :"edit",
     row
    };

    const editDialogRef= this.dialog.open(AddDialogComponent,editDialogConfig);

   

    // Subscribe when the dialog box closes
    editDialogRef.afterClosed().subscribe(
      (res)=>{
        // Receive data from dialog component
        // res contains data sent from the dialog
        console.log("after update");
        console.log(res);
        let index = res.id -1;
        this.orderItems[index] = res;
        console.log(this.orderItems);
        this.dataSource = new MatTableDataSource<orderData>(this.orderItems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
         
      });
    
  }

  

   /**
   * Method to show confirmation popup
   */
  openConfirmationModal(template: TemplateRef<any>, index: number=-1) {
    console.log(template, index);
    console.log(this.orderItems);
    this.selectedItem = this.orderItems.find((obj) => {
      return obj.id === index;
    });
    console.log(this.selectedItem);
   // this.selectedItem['index'] = index-1;
    this.bsModalRef = this.modalService.show(template, {class: 'modal-sm modal-sms'});
  }
  
   /**
   * Method called once delete is confirmed by the user 
   */
  confirm(): void {
    this.modalService.hide();
    console.log(this.selectedItem);
    this.dataservice.deleteOrderData({
      index: this.selectedItem['id'],
    })
    .subscribe({
      next:(res)=>{
        alert("Product deleted Successfully");
        console.log(this.selectedItem['id']);
       var index = this.orderItems.findIndex(x => x.id === this.selectedItem['id']);
       console.log(this.orderItems.splice(index, 1));
        this.bsModalRef?.hide();
         
        console.log(this.orderItems);
        this.dataSource = new MatTableDataSource<orderData>(this.orderItems);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:()=>{
        alert("Error while updating the record");
      }
    });
      
  }

   /**
   * Method to hide the modal window
   */
  decline(): void {
    this.bsModalRef?.hide();
  }

   

}
