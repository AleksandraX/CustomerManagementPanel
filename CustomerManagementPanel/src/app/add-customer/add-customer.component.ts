import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../client-list/client-list.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  @Input("newCustomerInput") newCustomer: Customer;
  @Output() addNewCustomerEventEmitter = new EventEmitter<Customer>();

  copyOfCustomer: Customer;
  isDisabled: boolean = true;
  
  form: FormGroup = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    "lastName": new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    "address": new FormGroup({
      "country": new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      "zipCode": new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "city": new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      "street": new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
    }),
    "gender": new FormControl(''),
    "phoneNumber": new FormControl('',[Validators.required, Validators.minLength(9), Validators.maxLength(15)]),
    "mail": new FormControl('',[Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.email])
  });
  
  

  constructor() { }

  ngOnInit() {
  }

  saveCustomer(newCustomer: Customer){
    this.addNewCustomerEventEmitter.emit(newCustomer);
  }


  onSubmit() {
    console.log(this.form.value);
  }

  required(propName: string): boolean {
     return (
      this.form.get(propName)?.hasError('required') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
    }

    minLength(propName: string): boolean {
      console.log("error:", this.form.get(propName).errors);
      return (
       this.form.get(propName)?.hasError('minlength') && 
       this.form.get(propName).touched &&
       this.form.get(propName).dirty
     );
      }

    maxLength(propName: string): boolean {
      console.log("error:", this.form.get(propName).errors);
      return (
        this.form.get(propName)?.hasError('maxlength') && 
        this.form.get(propName).touched &&
        this.form.get(propName).dirty
      );
      }
}
