import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Customer } from '../models/customer';
import { CustomerForCreation } from '../models/customerForCreation';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  // @Input("newCustomerInput") newCustomer: Customer;
   @Output() addNewCustomerEventEmitter = new EventEmitter<Customer>();

  copyOfCustomer: Customer;
  isDisabled: boolean = true;
  addingMode:boolean = false;
  
  form: FormGroup;
  customerExist: boolean = true;
  

  constructor(
    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) { 
    this.route.data.subscribe(value => {
      this.copyOfCustomer = value["customer"];
      console.log("in component: ", this.copyOfCustomer);

      if(this.copyOfCustomer.id==="0"){
        this.addingMode = true;
      }else if(this.copyOfCustomer === null){
        this.customerExist = false;
      }
  });

  this.form = new FormGroup({
    "name": new FormControl(this.copyOfCustomer.name, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    "lastName": new FormControl(this.copyOfCustomer.lastName,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    "address": new FormGroup({
      "country": new FormControl(this.copyOfCustomer.address.country,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      "zipCode": new FormControl(this.copyOfCustomer.address.zipCode,[Validators.required, Validators.minLength(4), Validators.maxLength(30)]),
      "city": new FormControl(this.copyOfCustomer.address.city,[Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      "street": new FormControl(this.copyOfCustomer.address.street,[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
    }),
    "gender": new FormControl(this.copyOfCustomer.gender, [Validators.required]),
    "phoneNumber": new FormControl(this.copyOfCustomer.phoneNumber,[Validators.required, Validators.minLength(9), Validators.maxLength(15),]),
    "mail": new FormControl(this.copyOfCustomer.email,[Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });

}

  ngOnInit() {
  }

  saveCustomer(){
    console.log("first step saving", this.form.value);

    let customerToCreate: CustomerForCreation = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      age: this.form.value.age,
      address: this.form.value.address,
      phoneNumber: this.form.value.phoneNumber,
      email: this.form.value.email,
      gender: this.form.value.gender
    }

    console.log("saving", customerToCreate)
    // wywolac service i zapisac
     this.clientsService.create(customerToCreate).subscribe(response => {
       console.log("Subscribe for creation")
     });
  }

  required(propName: string): boolean {
     return (
      this.form.get(propName)?.hasError('required') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
    }

    minLength(propName: string): boolean {
      return (
       this.form.get(propName)?.hasError('minlength') && 
       this.form.get(propName).touched &&
       this.form.get(propName).dirty
     );
      }

    maxLength(propName: string): boolean {
      return (
        this.form.get(propName)?.hasError('maxlength') && 
        this.form.get(propName).touched &&
        this.form.get(propName).dirty
      );
      }

      pattern(propName: string): boolean {
      return (
        this.form.get(propName)?.hasError('pattern') && 
        this.form.get(propName).touched &&
        this.form.get(propName).dirty
      );
      }
}
