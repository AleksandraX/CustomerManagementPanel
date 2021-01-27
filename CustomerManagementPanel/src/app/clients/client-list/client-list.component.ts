import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faEdit,
  faInfo,
  faPlusCircle,
  faPlusSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MyPager, OrderedItem } from 'src/app/shared/models/shared.models';
import { ClientsService } from '../clients.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  isDetailsClicked: boolean = false;
  isAddingMode: boolean = false;
  newCustomer: Customer = null;
  id: number = 11114;
  customerObjectList: Customer[];
  orderedCustomers: OrderedItem[];

  faTrash = faTrash;
  faEdit = faEdit;
  faInfo = faInfo;
  faPlusSquare = faPlusSquare;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private clientService: ClientsService
  ) {
    this.route.data.subscribe((value) => {
      this.customerObjectList = value['customerList'];
    });
  }

  ngOnInit(): void {}

  deleteCustomer(customerId: string) {
    this.clientService.delete(customerId).subscribe((response) => {
      console.log('delete');
      this.toastr.info('Customer has been deleted!', 'Info');
    });
  }

  addCustomer() {
    this.isAddingMode = !this.isAddingMode;
    this.isDetailsClicked = false;
    this.newCustomer = new Customer(
      (++this.id).toString(),
      '',
      '',
      0,
      0,
      null,
      '',
      '',
      ''
    );
  }

  onSubmit(addingUser: NgForm) {
    console.log(addingUser.value);
  }

  onCustomerEdit(editedCustomer: Customer) {
    //   let index = CUSTOMERLIST.findIndex(customer => customer.id == editedCustomer.id);
    //   CUSTOMERLIST[index] = Object.assign({}, editedCustomer);
  }

  onCustomerAdd(newCustomer: Customer) {
    newCustomer.id = (++this.id).toString();
    this.toastr.success('A new customer has been added!', 'New Customer');
  }

  onPageChanged(event: MyPager) {
    this.orderedCustomers = event.pageOfItems;
  }
}