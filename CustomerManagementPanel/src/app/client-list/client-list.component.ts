import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  customerList: string[] = ["Paula Murlik" , "Sisi Murlik", "Amor Murlik"];
  newCustomer: Customer = null;
  id: number = 11114;
  
  

  customerObjectList: Customer[] = [
     { 
     id: 11111, 
     name: "Kacper",
     lastName: "Bergański", 
     age: 21, 
     sex: "M", 
     city: "Chawszczyno", 
     phoneNumber: 72123132, 
     mail: "kacper.berganski@onet.pl"
    },
    new Customer(11112, "Amor", "Murlik", 4, "M", "Gdynia", 312312312, "amor@onet.pl"),
    new Customer(11113, "Sisi", "Murlik", 7, "F", "Gdynia", 624381876, "sisi@wp.pl")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Another removal method
  // deleteCustomer(customerToDelete:string){
  //   let index = this.customerList.indexOf(customerToDelete); 
  //   this.customerList.splice(index,1);
  // }
  
  deleteNewListCustomer(customerToDelete:Customer){
    for (let i = 0; i < this.customerObjectList.length; i++){
      if(customerToDelete.id === this.customerObjectList[i].id){
        this.customerObjectList.splice(i,1);
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
    this.newCustomer = new Customer(this.id++,"","", 0, "", "", 0, "");
  }

  saveCustomer(){
    this.customerObjectList.push(this.newCustomer); 
    this.isAddingMode = false;
  }

  onSubmit(addingUser: NgForm){
    console.log(addingUser.value);
  }

  onCustomerEdit(editedCustomer: Customer) {
    let index = this.customerObjectList.findIndex(customer => customer.id == editedCustomer.id);
    this.customerObjectList[index] = Object.assign({}, editedCustomer);
  }

  onCustomerAdd(newCustomer: Customer){
    console.log(newCustomer);
    newCustomer.id = this.id++;
    this.customerObjectList.push(newCustomer);

  }

}



export class Customer {
  id:number;
  name:string;
  lastName:string;
  age:number;
  sex:string;
  city:string;
  phoneNumber:number;
  mail:string;

  constructor(
     id: number,
     name: string,
     lastName:string,
     age:number,
     sex:string,
     city:string,
     phoneNumber:number,
     mail:string) {
      this.id = id;
      this.name = name;
      this.lastName = lastName;
      this.age = age;
      this.sex = sex;
      this.city = city;
      this.phoneNumber = phoneNumber;
      this.mail = mail; 
  }
}

