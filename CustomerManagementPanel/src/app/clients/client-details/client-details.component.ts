import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
chosenCustomer: Customer;

//  @Input("chosenCustomerInput") chosenCustomer: Customer;
 copyOfCustomer: Customer;

 @Output() editedCustomerEventEmitter = new EventEmitter<Customer>();

  constructor(
    private toastr: ToastrService, 
    private route: ActivatedRoute
    ) { 
    this.route.data.subscribe(data =>
      this.chosenCustomer = data['custmer']);

      console.log("constr details: ", this.chosenCustomer);
  }

  // don't care about this.
  ngOnInit() {
    this.copyOfCustomer = Object.assign({}, this.chosenCustomer);
  }

  saveName(copyOfCustomer){
    if(copyOfCustomer.name == this.chosenCustomer.name) {
      console.error(`Error: name cannot equals ${copyOfCustomer.name}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Changes were made to the name.', 'Saved');
    };
  }

  saveLastName(copyOfCustomer){
    if(copyOfCustomer.lastName == this.chosenCustomer.lastName) {
      console.error(`Error: lastName cannot equals ${copyOfCustomer.lastName}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Changes were made to the last name.', 'Saved');
    }
  }

  saveCity(copyOfCustomer){
    if(copyOfCustomer.address.id == this.chosenCustomer.address.id) {
      console.error(`Error: address cannot equals ${copyOfCustomer.address.id}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Changes were made to the address.', 'Saved');
    }
  }

  saveGender(copyOfCustomer){
    if(copyOfCustomer.sex == this.chosenCustomer.sex) {
      console.error(`Error: sex cannot equals ${copyOfCustomer.sex}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Gender changes were made.', 'Saved');
    }
  }

  savePhoneNumber(copyOfCustomer){
    if(copyOfCustomer.phoneNumber == this.chosenCustomer.phoneNumber) {
      console.error(`Error: city cannot equals ${copyOfCustomer.phoneNumber}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Changes were made to the phone number.', 'Saved');
    }
  }

  saveMail(copyOfCustomer){
    if(copyOfCustomer.mail == this.chosenCustomer.mail) {
      console.error(`Error: city cannot equals ${copyOfCustomer.mail}`);
    }else {
      this.editedCustomerEventEmitter.emit(copyOfCustomer);
      this.toastr.success('Changes were made to the email.', 'Saved');
    }
  }

}