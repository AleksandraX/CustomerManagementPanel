import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../client-list/client-list.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

 @Input("chosenCustomerInput") chosenCustomer: Customer;
 copyOfCustomer: Customer;

 @Output() editedCustomerEventEmitter = new EventEmitter<Customer>();

  constructor() { }

  // don't care about this.
  ngOnInit() {
    this.copyOfCustomer = Object.assign({}, this.chosenCustomer);
  }

  saveName(copyOfCustomer){
    if(copyOfCustomer.name == this.chosenCustomer.name) {
      console.error(`Error: name cannot equals ${copyOfCustomer.name}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

  saveLastName(copyOfCustomer){
    if(copyOfCustomer.lastName == this.chosenCustomer.lastName) {
      console.error(`Error: lastName cannot equals ${copyOfCustomer.lastName}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

  saveCity(copyOfCustomer){
    if(copyOfCustomer.city == this.chosenCustomer.city) {
      console.error(`Error: city cannot equals ${copyOfCustomer.city}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

  saveGender(copyOfCustomer){
    if(copyOfCustomer.sex == this.chosenCustomer.sex) {
      console.error(`Error: sex cannot equals ${copyOfCustomer.sex}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

  savePhoneNumber(copyOfCustomer){
    if(copyOfCustomer.phoneNumber == this.chosenCustomer.phoneNumber) {
      console.error(`Error: city cannot equals ${copyOfCustomer.phoneNumber}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

  saveMail(copyOfCustomer){
    if(copyOfCustomer.mail == this.chosenCustomer.mail) {
      console.error(`Error: city cannot equals ${copyOfCustomer.mail}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
    }
  }

}
