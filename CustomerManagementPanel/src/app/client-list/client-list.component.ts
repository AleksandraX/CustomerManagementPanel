import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  customerList: string[] = ["Paulina Murlik" , "Sisi Murlik", "Amor Murlik"];
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

  customerToDelete:number;
}
