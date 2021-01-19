import { CurrencyPipe } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faBroom, faExclamation, faSave, faTimes, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/clients/clients.service';
import { Customer } from 'src/app/clients/models/customer';
import {OrdersForCreation } from 'src/app/clients/models/orders';
import { MyFormGroup } from 'src/app/shared/extentions/myFormGroup';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-add-modal',
  templateUrl: './orders-add-modal.html',
  styleUrls: ['./orders-add-modal.scss']
})
export class OrdersAddModal implements OnInit, AfterViewInit{

  @ViewChild('ordersAddModal' , { static: false }) modal: ModalDirective;

  @ViewChild('price') priceChild: ElementRef;

  clientsList: Customer[];
  ordersAddList: OrdersForCreation[];
  form: MyFormGroup = null;
  faTimes = faTimes;
  faSave = faSave;
  faExclamation = faExclamation;

  order: OrdersForCreation ={ 
    orderedByCustomerId: "",
    price: 0,
  };

  constructor(
    private toastr: ToastrService,
    private ordersService: OrdersService,
    private customerService: ClientsService,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { 
    this.form = new MyFormGroup({
      "price": new FormControl(this.order.price,[Validators.required, Validators.pattern("[0-9]*[.]?[0-9]+")]),
      "orderedByCustomerId": new FormControl(this.order.orderedByCustomerId,[Validators.required, Validators.minLength(3), Validators.maxLength(40)])
    }); 

      this.clientsList = [];
  }
 

  ngOnInit() {
    this.customerService.getAllClients().subscribe(clients =>
      this.clientsList = clients);
  }

  ngAfterViewInit(): void {
    this.priceChild.nativeElement.focus();
    this.priceChild.nativeElement.setAttribute('placeholder', "Enter price");
    this.priceChild.nativeElement.value = null;
  }


  
  saveOrders(){
    console.log("first step saving", this.form.value);

    let ordersToCreate: OrdersForCreation = {
      price: this.form.value.price,
      orderedByCustomerId: this.form.value.orderedByCustomerId,
    }


     this.ordersService.create(ordersToCreate).subscribe(response => {
       console.log("Subscribe for creation")
     });
  };


    showSuccess() {
      this.toastr.success('Order added!','Success!');
    }

    clean() {
      this.toastr.success('Data cleared!','Success!');
    }

    close(){
      this.modal.hide();
    }

    onShown() {

    }

    show() {
      this.modal.show();
    }

}
