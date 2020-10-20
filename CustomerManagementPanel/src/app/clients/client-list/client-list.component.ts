import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../models/customer';
import { CUSTOMERLIST } from '../models/customer-list';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  isDetailsClicked: boolean = false;
  isAddingMode: boolean = false;
  chosenCustomer: Customer;
  customer: string;
  newCustomer: Customer = null;
  id: number = 11114;
  customerObjectList: Customer[] = CUSTOMERLIST;
  
  constructor(private toastr: ToastrService) { 
  }

  ngOnInit(): void {
  }
  
  deleteNewListCustomer(customerToDelete:Customer){
    for (let i = 0; i < CUSTOMERLIST.length; i++){
      if(customerToDelete.id === CUSTOMERLIST[i].id){
        CUSTOMERLIST.splice(i,1);
      }
    }
    if(this.chosenCustomer.id == customerToDelete.id){
      this.chosenCustomer = null;
    } 
  }

  showDetails(customer: Customer){
    this.isDetailsClicked =!this.isDetailsClicked;
    this.chosenCustomer = customer;
    this.isAddingMode = false;
  }

  addCustomer(){
    this.isAddingMode =!this.isAddingMode;
    this.isDetailsClicked = false;
    this.newCustomer = new Customer(this.id++,"","", 0, "", null, 0, "");
  }

  onSubmit(addingUser: NgForm){
    console.log(addingUser.value);
  }

  onCustomerEdit(editedCustomer: Customer) {
    let index = CUSTOMERLIST.findIndex(customer => customer.id == editedCustomer.id);
    CUSTOMERLIST[index] = Object.assign({}, editedCustomer);
  }

  onCustomerAdd(newCustomer: Customer){
    console.log(newCustomer);
    newCustomer.id = this.id++;
    CUSTOMERLIST.push(newCustomer);
    this.toastr.success('A new customer has been added!', 'New Customer');

  }
}






