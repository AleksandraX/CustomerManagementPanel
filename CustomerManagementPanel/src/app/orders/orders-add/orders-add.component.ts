import { Component, OnInit } from '@angular/core';
import { OrderForCreation } from 'src/app/clients/models/orders';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {

  address: OrderForCreation ={ 
    id: "",
    price: 0,
    creationDate: null,
    lastUpdateDate: null,
    orderedByCustomerId: "",
    orderedByCustomerFullName: "",
    statusId: ""
  };

  constructor() { }

  ngOnInit() {
  }

}
