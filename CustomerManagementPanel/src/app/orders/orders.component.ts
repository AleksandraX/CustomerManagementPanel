import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Orders } from '../clients/models/orders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList: Orders[];
  id: number = 1;

  constructor(    
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService
    ) {
      this.route.data.subscribe(value => {      
        this.ordersList = value["ordersList"];
        console.log(this.ordersList);
      });
   }

  ngOnInit() {
  }

  getDays(lastUpdateDate: Date){
    // let data1: Date = parseInt(lastUpdateDate);
      // let data2: any = parseInt(theNumberOfDays);
      let data = new Date(Math.abs(lastUpdateDate.getTime() - Date.now()));
      return( data.getDate() + " days") ;
  };
}
