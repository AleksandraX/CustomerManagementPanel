import { formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  Order,
  OrderStatus,
  OrderStatusChangeParameters,
} from '../clients/models/orders';
import { MyPager, OrderedItem } from '../shared/models/shared.models';
import { OrdersOptionModal } from './orders-option/orders-option-modal';
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
  orderedOrders: OrderedItem[] = [];
  selectedOrdersId: string[] = [];
  checkBoxSelect: boolean = false;
  pageSizeFromOrders = 10;

  @ViewChild('addOrderModal') addOrderModalRef: ModalDirective; 
  optionOrderModalRef: BsModalRef; 

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private modalService: BsModalService
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
  
  ngAfterViewInit(): void {

  }
  getDays(lastUpdateDate?: Date): string {
    if (lastUpdateDate == null) {
      return '-';
    }
    let dateInString = formatDate(lastUpdateDate, 'yyyy-MM-dd', 'en');
    let date = new Date(dateInString);

    let now = new Date(Date.now());
    let data = now.getDay() - date.getDay();
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
    this.orderedOrders = event.pageOfItems;
    this.checkBoxSelect = false;
    this.selectedOrdersId = [];
  }

  changePageSize(filterVal: any){
    this.pageSizeFromOrders = filterVal;
    console.log(this.pageSizeFromOrders);
  }

  checkCheckList(orderId: string){
    if(this.selectedOrdersId.includes(orderId)){
      let index = this.selectedOrdersId.findIndex(id => id == orderId);
      this.selectedOrdersId.splice(index ,1);
      console.log("usuń")
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display='none';
    }else{
      this.selectedOrdersId.push(orderId);
      console.log("dodaj");
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display='block';
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
      document.getElementById('button').style.display='block';
    }else{
      this.orderedOrders.map(order => order.item.id);
      this.selectedOrdersId = [];
      console.log("usuwamy wszystko")
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display='none';
    }
  }


  showAddOrder() {
    this.addOrderModalRef.show();
  }

  showOptionOrder() {
    console.log(this.orderedOrders);
    this.optionOrderModalRef = this.modalService.show(OrdersOptionModal);
    //this.optionOrderModalRef.show();
    this.optionOrderModalRef.content.selectedOrders = this.orderedOrders.filter(
    orderFromParent => this.selectedOrdersId.includes(orderFromParent.item.id));

    this.optionOrderModalRef.content.selectedOrdersIds = this.selectedOrdersId;
    }
}
