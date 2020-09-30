import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  customerList: string[] = ["Paulina Murlik" , "Sisi Murlik", "Amor Murlik"];
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
    new Customer(11113, "Sisi", "Murlik", 7, "w", "Gdynia", 62438187, "sisi@wp.pl")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addCustomer(newCustomer:string){
    console.log(newCustomer);
    this.customerList.push(newCustomer);
    console.log(this.customerList);
  }

  deleteCustomer(customerToDelete:string){
    let index = this.customerList.indexOf(customerToDelete);    //po tym idexie usunąć pozycję z listy
    this.customerList.splice(index,1);
  }
  
  deleteNewListCustomer(customerToDelete:Customer){
    for (let i = 0; i < this.customerObjectList.length; i++){
      if(customerToDelete.id === this.customerObjectList[i].id){
        this.customerObjectList.splice(i,1);
      }
    } 
  }
}

// todo przenieś do osobnej klasy

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

