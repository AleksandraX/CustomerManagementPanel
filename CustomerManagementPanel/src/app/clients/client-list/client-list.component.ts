import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  newCustomer: Customer = null;
  id: number = 11114;
  customerObjectList: Customer[];
  
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) { 
      this.route.data.subscribe(value => {
        this.customerObjectList = value["customerList"];
      });
  }

  ngOnInit(): void {
  }
  
  deleteNewListCustomer(customerToDelete:Customer){
    for (let i = 0; i < CUSTOMERLIST.length; i++){
      if(customerToDelete.id === CUSTOMERLIST[i].id){
        CUSTOMERLIST.splice(i,1);
      }
    } 
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







