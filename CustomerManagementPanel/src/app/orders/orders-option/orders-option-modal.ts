import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/clients/models/customer';
import { OrderStatus } from 'src/app/clients/models/orders';
import { OrderedItem } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-orders-option-modal',
  templateUrl: './orders-option-modal.html',
  styleUrls: ['./orders-option-modal.scss']
})
export class OrdersOptionModal implements OnInit, AfterViewInit {
  @Input() selectedOrdersIds: string[] =[];
  @Input() orderedByCustomers: OrderedItem[];
  @Input() orderStatuses: OrderStatus[];
  selectedOrdersId: string[] = [];
  faSave = faSave;

  @ViewChild('optionOrderModal' , { static: false }) modal: ModalDirective;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
  ) {
    console.log(this.selectedOrdersIds);
   }
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    console.log(this.selectedOrdersIds);
  }

  ngOnChanges(){
    this.selectedOrdersIds;
  }

  showSuccess() {
    this.toastr.success('Order added!','Success!');
  }

  close(){
    this.modal.hide();
  }

  show() {
    this.modal.show();
  }

}
