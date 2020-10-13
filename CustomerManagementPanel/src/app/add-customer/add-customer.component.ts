import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../client-list/client-list.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  @Input("newCustomerInput") newCustomer: Customer;
  copyOfCustomer: Customer;
  isDisabled: boolean = true;
 
  @Output() addNewCustomerEventEmitter = new EventEmitter<Customer>();

  constructor() { }

  ngOnInit() {
  }

  saveCustomer(newCustomer: Customer){
    this.addNewCustomerEventEmitter.emit(newCustomer);
  }
}
