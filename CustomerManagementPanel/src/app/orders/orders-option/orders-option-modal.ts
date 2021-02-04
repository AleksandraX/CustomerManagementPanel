import {
  Component,
  OnInit,
} from '@angular/core';
import {
  faSave,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  BsModalRef,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  OrderStatus,
  OrderStatusChangeParameters,
} from 'src/app/clients/models/orders';
import { OrderedItem } from 'src/app/shared/models/shared.models';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-option-modal',
  templateUrl: './orders-option-modal.html',
  styleUrls: ['./orders-option-modal.scss'],
})
export class OrdersOptionModal implements OnInit {
  selectedOrdersIdsFromParent: string[] = [];
  selectedOrdersFromParent: OrderedItem[] = [];
  orderStatuses: OrderStatus[] = [];
  
  parametersRequests: OrderStatusChangeParameters[] = [];

  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private ordersService: OrdersService
  ) {

  }

  ngOnInit() {
    this.ordersService
      .getAllOrderStatus()
      .subscribe((response) => (this.orderStatuses = response));
  }

  saveNewOrderStatus() {
    this.parametersRequests.forEach((paramReq) => {
      this.ordersService.changeOrderStatus(paramReq).subscribe(() => {
        this.toastr.success('Order status changed!', 'Success');
        this.bsModalRef.hide();
      });
    });
  }

  close() {
    this.bsModalRef.hide();
  }

  deleteOrderFromList(orderId: string) {
    let index = this.selectedOrdersFromParent.findIndex(
      (order) => order.item.id == orderId
    );
    this.selectedOrdersFromParent.splice(index, 1);
    console.log(this.selectedOrdersFromParent);
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

  getStatusName(statusId: string): string {
    let orderStatus = this.orderStatuses.find(
      (status) => status.id == statusId
    );
    return orderStatus?.name;
  }

  onSelectedStatus(newOrderStatusId: string) {
    this.parametersRequests = [];

    this.selectedOrdersFromParent.forEach((order) => {
      order.item.statusId = newOrderStatusId;
      this.parametersRequests.push({
        orderId: order.item.id,
        newOrderStatusId: newOrderStatusId,
      });
    });
  }
}
