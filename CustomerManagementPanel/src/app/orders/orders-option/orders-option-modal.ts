import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faSave, faTimes, faTrash, faUniversalAccess } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/clients/models/customer';
import { Order, OrderStatus, OrderStatusChangeParameters } from 'src/app/clients/models/orders';
import { OrderedItem } from 'src/app/shared/models/shared.models';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-option-modal',
  templateUrl: './orders-option-modal.html',
  styleUrls: ['./orders-option-modal.scss']
})
export class OrdersOptionModal implements OnInit {
  selectedOrdersIds: string[] = [];
  ordersFromParent: OrderedItem[] = [];
  orderStatuses: OrderStatus[] = [];
  ordersList: Order[] = [];
  selectedOrders: OrderedItem[] = [];
  parametersRequests: OrderStatusChangeParameters[] = [];

  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  // @ViewChild('optionOrderModal' , { static: false }) modal: ModalDirective;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private ordersService: OrdersService,
  ) {
   
   }

  ngOnInit() {
    this.ordersService.getAllOrderStatus()
      .subscribe((response) => (this.orderStatuses = response));
  }


  saveNewOrderStatus() {
    this.parametersRequests.forEach(paramReq => {
    this.ordersService.changeOrderStatus(paramReq)
    .subscribe((response) => {
      this.ordersService.getAllListItems().subscribe((response) => {
        this.ordersList = response;
      });
      this.toastr.success('Order status changed!', 'Success');
    });
  });
  }

  close(){
    this.bsModalRef.hide();
  }

  show() {
  }

  orderFromOptionsDelete(statusId:string){
        let index = this.selectedOrdersIds.findIndex(orderId => orderId == statusId)
        this.selectedOrdersIds.splice(index ,1);
        console.log(this.selectedOrdersIds)
    };

    checkStatus(orderStatusId: string, cokolwiekCoPowiemywHtmlu: string) {
      let orderStatus = this.orderStatuses.find(
        (status) => status.id == orderStatusId
      );
  
      if (!!orderStatus && orderStatus.name === cokolwiekCoPowiemywHtmlu) {
        return true;
      }
      return false;
    }


    getStatusName(statusId: string): string{

      let orderStatus = this.orderStatuses.find(
        (status) => status.id == statusId);
      return orderStatus?.name;
    }

    onSelectedStatus(newOrderStatusId: string) {
      this.parametersRequests = [];
      this.selectedOrdersIds.forEach(orderId => {
        this.parametersRequests.push({
          orderId: orderId,
          newOrderStatusId: newOrderStatusId
        })
      });
    }
}


