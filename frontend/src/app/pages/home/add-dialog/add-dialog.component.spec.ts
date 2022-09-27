import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog.component';
import {HttpClientModule} from '@angular/common/http';


describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async ()  => {
    await TestBed.configureTestingModule({
      declarations : [AddDialogComponent],
      imports:[FormsModule,ReactiveFormsModule,HttpClientModule,MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AddDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('TEST a Form Group ELEMENT COUNT',()=>{
      const formElement = fixture.debugElement.nativeElement.querySelector('#orderForm');
      const inputElements = formElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(6);
    });
    //Success Test Case for Form Values
    it('TEST initial For values for Form Group',()=>{
      const orderFormGroup= component.orderForm;
      const orderFormValues = {
        name:undefined ,
        state:undefined ,
        zip:undefined ,
        amount:undefined ,
        qty:undefined ,
        item:undefined 
      }
    expect(orderFormGroup.value).toEqual(orderFormValues);
    });
    //Failure Test Case for Form Values
    it('TEST initial For values for Form Group',()=>{
      const orderFormGroup= component.orderForm;
      const orderFormValues = {
        username:'',
        password:''
      }
    expect(orderFormGroup.value).toEqual(orderFormValues);
    });

    it('Check a Form is valid with all validations fufilled'),()=>{

      const formElement : HTMLInputElement= fixture.debugElement.nativeElement.querySelector('#orderForm');
      const inputElements = formElement.querySelectorAll('input');
            inputElements[0].value='';
            inputElements[1].value='';
            
            inputElements[0].dispatchEvent(new Event('input'));
            inputElements[1].dispatchEvent(new Event('input'));
            
            const isOrderFormValid =component.orderForm.valid;
            
             expect(isOrderFormValid).toBeTruthy();
            
   }

   it('TEST Name value before entering some value and validate',()=>{
     
    const formElement : HTMLInputElement= fixture.debugElement.nativeElement.querySelector('#orderForm');
    const orderNameElement : HTMLInputElement = formElement.querySelectorAll('input')[0];
     
    const orderNameValueFromGroup =component.orderForm.get('name');
    expect(orderNameElement.value).toEqual(orderNameValueFromGroup?.value);
    expect(orderNameValueFromGroup?.errors).not.toBeNull();
     
  });

  });

