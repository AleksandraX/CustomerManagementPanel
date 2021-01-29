import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  faSave = faSave;
  faTimes = faTimes;
  faTrash = faTrash;

  // @ViewChild('optionOrderModal' , { static: false }) modal: ModalDirective;

  constructor(
    public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private ordersService: OrdersService,
  ) {
    console.log(this.selectedOrdersIds);
   }

  ngOnInit() {
    console.log(this.selectedOrdersIds);
  
  }

  // ngOnChanges(){
  //   ///nasluchujesz na selected ids
  //   // szukasz w ordered by customers wspolnych idkow z selexted ids
  //   // nowa pusta lista jako propercja, po ktorej iterujesz na froncie
  //   // podstawiasz pod liste na froncie przez ktora lecisz petla for wartosc tych orderedow, ktorych id jest w selected ids list.
  //   // this.ordersIdNumbers = //zaktualizowac tymi orderami, ktore maja te same id co selected list
    
  // }



  showSuccess() {
    this.toastr.success('Order added!','Success!');
  }

  close(){
    this.bsModalRef.hide();
  }

  show() {
  }

  orderFromOptionsDelete(orderNumber:number){
        let index = this.selectedOrders.findIndex(order => order.orderNumber == orderNumber)
        this.selectedOrders.splice(index ,1);
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
}


