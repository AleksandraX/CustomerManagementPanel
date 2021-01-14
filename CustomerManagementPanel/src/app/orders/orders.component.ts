import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import {
  Order,
  OrderStatus,
  OrderStatusChangeParameters,
} from '../clients/models/orders';
import { MyPager, OrderedItem } from '../shared/models/shared.models';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: Order[]= [];
  id: number = 1;
  orderStatuses: OrderStatus[] =[];
  selectedOrderStatus: OrderStatus;
  optionDisabled: boolean = false;
  faPlusSquare = faPlusSquare;
  orderedOrders: OrderedItem[];
  selectedOrdersId: string[] = [];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {
    this.route.data.subscribe((value) => {
      this.ordersList = value['ordersList'];
      console.log(this.ordersList);

      this.ordersService
        .getAllOrderStatus()
        .subscribe((response) => (this.orderStatuses = response));
    });
  }

  ngOnInit() {}

  getDays(lastUpdateDate?: Date): string {
    if (lastUpdateDate == null) {
      return '-';
    }
    let dateInString = formatDate(lastUpdateDate, 'yyyy-MM-dd', 'en');
    let date = new Date(dateInString);

    let now = new Date(Date.now());
    let data = date.getDay() - now.getDay();
    return data + ' days';
  }

  onSelectedStatus(newOrderStatusId: string, orderId: string) {
    let parametersRequest: OrderStatusChangeParameters = {
      orderId: orderId,
      newOrderStatusId: newOrderStatusId,
    };

    this.ordersService
      .changeOrderStatus(parametersRequest)
      .subscribe((response) => {
        this.ordersService.getAllListItems().subscribe((response) => {
          this.ordersList = response;
        });
        this.toastr.success('Order status changed!', 'Success');
      });
  }

  getSelected(orderId: string): OrderStatus {
    return this.orderStatuses.find((status) => status.id == orderId);
  }

  checkStatus(orderStatusId: string, cokolwiekCoPowiemywHtmlu: string) {
    let orderStatus = this.orderStatuses.find(
      (status) => status.id == orderStatusId
    );

    if (!!orderStatus && orderStatus.name === cokolwiekCoPowiemywHtmlu) {
      return true;
    }
    return false;
  }


  onPageChanged(event: MyPager) {
    console.log("łapiemy event", event);
    this.orderedOrders = event.pageOfItems;
  }

  checkCheckList(orderId: string){
    if(this.selectedOrdersId.includes(orderId)){
      let index = this.selectedOrdersId.findIndex(id => id == orderId);
      this.selectedOrdersId.splice(index ,1);
      console.log("usuń")
      console.log(this.selectedOrdersId);
    }else{
      this.selectedOrdersId.push(orderId);
      console.log("dodaj");
      console.log(this.selectedOrdersId);
    }
  }

  isOrderSlected(orderId: string) : boolean {
    return this.selectedOrdersId.includes(orderId);
  }

  toggleAllCheckList(){
    if(this.selectedOrdersId.length != this.orderedOrders.length){
      let allVisibleIds = this.orderedOrders.map(order => order.item.id);
      this.selectedOrdersId = [];
      this.selectedOrdersId = [...allVisibleIds];
      console.log("dodajemy wszystko")
      console.log(this.selectedOrdersId);
    }else{
      this.orderedOrders.map(order => order.item.id);
      this.selectedOrdersId = [];
      console.log("usuwamy wszystko")
      console.log(this.selectedOrdersId);
    }
  }
}
