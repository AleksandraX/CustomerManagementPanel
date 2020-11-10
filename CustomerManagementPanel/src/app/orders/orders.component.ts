
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../clients/models/orders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersList: Order[];
  id: number = 1;

  constructor(    
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService, 
    ) {
      this.route.data.subscribe(value => {      
        this.ordersList = value["ordersList"];
        console.log(this.ordersList);
      });
   }

  ngOnInit() {
  }

  getDays(lastUpdateDate?: Date): string{
    if(lastUpdateDate == null){
      return "-";
    }

      let dateInString = formatDate(lastUpdateDate, "yyyy-MM-dd", 'en');
      let date = new Date(dateInString);
      
      let now = new Date(Date.now());

      console.log("date", date.getDate());
      let data = (date.getDay() - now.getDay());
      return(data + " days") ;
  };
}
