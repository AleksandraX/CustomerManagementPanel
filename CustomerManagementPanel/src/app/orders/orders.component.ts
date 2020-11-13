import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order, OrderStatus, OrderStatusChangeParameters } from '../clients/models/orders';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  ordersList: Order[];
  id: number = 1;
  orderStatuses: OrderStatus[];
  selectedOrderStatus: OrderStatus;

  constructor(    
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService
    ) {

      
      this.route.data.subscribe(value => {      
        this.ordersList = value["ordersList"];
        console.log(this.ordersList);
       
        this.ordersService.getAllOrderStatus().subscribe(response =>
          this.orderStatuses = response)
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
      let data = (now.getDay() - date.getDay());
      return(data + " days") ;
  };


  onSelectedStatus(newOrderStatusId: string, orderId: string){
    let parametersRequest: OrderStatusChangeParameters = {
      orderId: orderId,
      newOrderStatusId: newOrderStatusId
    };

    this.ordersService.changeOrderStatus(parametersRequest).subscribe(response => {
      this.ordersService.getAllListItems().subscribe(response => 
        {
          this.ordersList = response;
        });
        this.toastr.success('Order status changed!', 'Success');
    })
  }


    getSelected(orderId:string) : OrderStatus{
      return this.orderStatuses.find(status => status.id == orderId);
    }
}
