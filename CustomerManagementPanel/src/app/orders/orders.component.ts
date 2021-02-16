import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faPlusSquare,
  faSort,
  faSortDown,
  faSortUp,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import {
  Order,
  OrderStatus,
  OrderStatusChangeParameters,
} from '../clients/models/orders';
import { SortHelper } from '../shared/helpers/sort-helper';
import { MyPager, OrderedItem } from '../shared/models/shared.models';
import { OrdersOptionModal } from './orders-option/orders-option-modal';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  ordersList: Order[] = [];
  ordersListInitial: Order[] = [];
  id: number = 1;
  orderStatuses: OrderStatus[] = [];
  selectedOrderStatus: OrderStatus;
  optionDisabled: boolean = false;
  faPlusSquare = faPlusSquare;
  faSort: IconDefinition = faSort;
  faSortUp: IconDefinition = faSortUp;
  faSortDown: IconDefinition = faSortDown;
  orderedOrders: OrderedItem[] = [];
  selectedOrdersId: string[] = [];
  selectedColumnName: SortColumnsBy;
  selectedColumnStatus: SortStatus;
  SortColumnsStatus: typeof SortStatus = SortStatus;
  SortColumns: typeof SortColumnsBy = SortColumnsBy;
  statusList: string[] = [];
  isAsc: boolean;
  checkBoxSelect: boolean = false;
  pageSizeFromOrders = 10;
  upArrowIcon: boolean;
  downArrowIcon: boolean;
  bothArrowIcon: boolean;

  @ViewChild('addOrderModal') addOrderModalRef: ModalDirective;
  optionOrderModalRef: BsModalRef;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private modalService: BsModalService,
  ) {
    this.route.data.subscribe((value) => {
      this.ordersListInitial = value['ordersList'];
      this.ordersListInitial.map(order => {
        let date = new Date(order.creationDate.toString().split('T')[0]);
        order.creationDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      });

      this.ordersList = JSON.parse(JSON.stringify(this.ordersListInitial));
      console.log(this.ordersList);

      this.ordersService
        .getAllOrderStatus()
        .subscribe((response) => (this.orderStatuses = response));
    });
  }

  ngOnInit() {
    this.selectedColumnName = SortColumnsBy.Id;

    for(let item in this.SortColumnsStatus){
      if (isNaN(Number(item))){
         this.statusList.push(item);
      }
    }
  }

  ngAfterViewInit(): void {}

  getDays(lastUpdateDate?: Date): string {
    if (lastUpdateDate == null) {
      return '-';
    }

    let now = new Date(Date.now());
    let data = now.getTime() - new Date(lastUpdateDate.toString()).getTime()
    return Math.floor(data / (1000 * 3600 * 24)) + ' days';
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

  changePageSize(filterVal: any) {
    this.pageSizeFromOrders = filterVal;
    console.log(this.pageSizeFromOrders);
  }

  checkCheckList(orderId: string, orderNumber: number) {
    if (this.selectedOrdersId.includes(orderId)) {
      let index = this.selectedOrdersId.findIndex((id) => id == orderId);
      this.selectedOrdersId.splice(index, 1);
      console.log('usuń');
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display = 'none';
      document.getElementById('row' + orderNumber).style.backgroundColor =
        'white';
    } else {
      this.selectedOrdersId.push(orderId);
      console.log('dodaj');
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display = 'block';
      document.getElementById('row' + orderNumber).style.backgroundColor =
        'AntiqueWhite';
    }
  }

  isOrderSlected(orderId: string): boolean {
    return this.selectedOrdersId.includes(orderId);
  }

  toggleAllCheckList() {
    if (this.selectedOrdersId.length != this.orderedOrders.length) {
      let allVisibleIds = this.orderedOrders.map((order) => order.item.id);
      this.selectedOrdersId = [];
      this.selectedOrdersId = [...allVisibleIds];
      console.log('dodajemy wszystko');
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display = 'block';
      // document.getElementById("row"+ orderNumber).style.backgroundColor = 'AntiqueWhite';
    } else {
      this.orderedOrders.map((order) => order.item.id);
      this.selectedOrdersId = [];
      console.log('usuwamy wszystko');
      console.log(this.selectedOrdersId);
      document.getElementById('button').style.display = 'none';
    }
  }

  showAddOrder() {
    this.addOrderModalRef.show();
  }

  showOptionOrder() {
    let filteredOrders = this.orderedOrders.filter((orderFromParent) =>
      this.selectedOrdersId.includes(orderFromParent.item.id)
    );

    const initialState = {
      selectedOrdersFromParent: JSON.parse(JSON.stringify(filteredOrders)),
      selectedOrdersIdsFromParent: Array.from(this.selectedOrdersId),
    };

    this.optionOrderModalRef = this.modalService.show(OrdersOptionModal, {
      initialState,
    });
    this.optionOrderModalRef.content.updateOrderListEvent.subscribe((data) => {
      this.ordersList = data;
    });
  }

  getArrowClass(columnNameClicked: SortColumnsBy): IconDefinition {
    if (columnNameClicked === this.selectedColumnName) {
      if (this.isAsc === false) {
        return this.faSortUp;
      } else {
        return this.faSortDown;
      }
    } else {
      return this.faSort;
    }
  }

  sortList(columnNameClicked: SortColumnsBy) {
    if (columnNameClicked === this.selectedColumnName) {
      this.isAsc = !this.isAsc;

      console.log(
        'sortowanie tej samej columny zgodnie z: ',
        this.isAsc ? 'descending' : 'ascending'
      );
    } else {
      this.selectedColumnName = columnNameClicked;
      this.isAsc = true;

      console.log(`sortowanie tej columny ${this.selectedColumnName} 
      zgodnie z: ${this.isAsc ? 'descending' : 'ascending'}`);
    }

    this.sort();
  }

  sort() {
    switch (this.selectedColumnName) {
      case SortColumnsBy.OrderedByCustomer:

        if (this.isAsc) {
          this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'orderedByCustomerFullName' )));
          } else {
            this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'orderedByCustomerFullName', false )));
          }
        break;

      case SortColumnsBy.Price:
        if (this.isAsc) {
          this.ordersList.sort((a, b) => a.price - b.price);
        } else {
          this.ordersList.sort((a, b) => b.price - a.price);
        }

        this.ordersList = JSON.parse(JSON.stringify(this.ordersList));

        break;
      case SortColumnsBy.OrderedDate:
        if (this.isAsc) {
        this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'creationDate' )));
        } else {
          this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'creationDate', false )));
        }
        break;

      case SortColumnsBy.LastUpdateDate:

        if (this.isAsc) {
          this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'lastUpdateDate' )));
          } else {
            this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'lastUpdateDate', false )));
          }
        break;

      case SortColumnsBy.DaysOfLastUpdate:

        if (this.isAsc) {
          this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'lastUpdateDate' )));
          } else {
            this.ordersList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.ordersList, 'lastUpdateDate', false )));
          }
        break;

      default:
    }
  }

  sortStatus(value: SortStatus){
    this.selectedColumnStatus = value;

    switch (+SortStatus[this.selectedColumnStatus]) {

        case SortStatus.Delivered:

          let orderStatusDelivered = this.orderStatuses.find((status) => status.name == "Delivered").id;
          let delivered = this.ordersListInitial.filter(order => order.statusId === orderStatusDelivered)
          this.ordersList = JSON.parse(JSON.stringify(delivered));

        break;

        case SortStatus.Cancelled:

          let orderStatusCancelled = this.orderStatuses.find((status) => status.name == "Cancelled").id;
          let cancelled = this.ordersListInitial.filter(order => order.statusId === orderStatusCancelled)
          this.ordersList = JSON.parse(JSON.stringify(cancelled));
          
        break;

        case SortStatus.New:

          let orderStatusNew = this.orderStatuses.find((status) => status.name == "New").id;
          let newStatus = this.ordersListInitial.filter(order => order.statusId === orderStatusNew);
          if(newStatus.length > 1) {
            this.ordersList = JSON.parse(JSON.stringify(newStatus));
          }
          this.ordersList = [];
        break;

        case SortStatus.OnItsWay:

          let orderStatusOnItsWay = this.orderStatuses.find((status) => status.name == "OnItsWay").id;
          let onItsWay = this.ordersListInitial.filter(order => order.statusId === orderStatusOnItsWay)
          this.ordersList = JSON.parse(JSON.stringify(onItsWay));

        break;

        case SortStatus.OutForDelivery:

          let orderStatusOutForDelivery = this.orderStatuses.find((status) => status.name == "OutForDelivery").id;
          let outForDelivery = this.ordersListInitial.filter(order => order.statusId === orderStatusOutForDelivery)
          this.ordersList = JSON.parse(JSON.stringify(outForDelivery));

        break;

        case SortStatus.Packing:

          let orderStatusPacking = this.orderStatuses.find((status) => status.name == "Packing").id;
          let packing = this.ordersListInitial.filter(order => order.statusId === orderStatusPacking)
          this.ordersList = JSON.parse(JSON.stringify(packing));

        break;

        case SortStatus.Confirmed:

          let orderStatusConfirmed = this.orderStatuses.find((status) => status.name == "Confirmed").id;
          let confirmed = this.ordersListInitial.filter(order => order.statusId === orderStatusConfirmed)
          this.ordersList = JSON.parse(JSON.stringify(confirmed));

        break;

        case SortStatus.ShowAll:

          this.ordersList = JSON.parse(JSON.stringify(this.ordersListInitial));

        break;

      default:
    }
  }
}

export enum SortColumnsBy {
  Id = 0,
  OrderedByCustomer,
  Price,
  OrderedDate,
  LastUpdateDate,
  DaysOfLastUpdate,
}

export enum SortStatus{
  ShowAll,
  Delivered,
  Cancelled,
  New,
  OnItsWay,
  OutForDelivery,
  Packing,
  Confirmed,
}