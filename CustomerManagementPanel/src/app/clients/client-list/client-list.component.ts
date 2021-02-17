import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faEdit,
  faInfo,
  faPlusCircle,
  faPlusSquare,
  faSort,
  faSortDown,
  faSortUp,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { SortHelper } from 'src/app/shared/helpers/sort-helper';
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
  customerObjectList: Customer[] = [];
  orderedCustomers: OrderedItem[] = [];
  isAsc: boolean;
  selectedColumnName: SortColumnsInClients;
  SortColumns: typeof SortColumnsInClients = SortColumnsInClients;
  upArrowIcon: boolean;
  downArrowIcon: boolean;
  bothArrowIcon: boolean;

  faTrash = faTrash;
  faEdit = faEdit;
  faInfo = faInfo;
  faPlusSquare = faPlusSquare;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faSort = faSort;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private clientService: ClientsService
  ) {
   
  }

  ngOnInit() {
    this.route.data.subscribe((value) => {
      this.customerObjectList = value['customerList'];
    
      this.selectedColumnName = SortColumnsInClients.Age;
      this.isAsc = true;
      this.sort();
  });
  }

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

  onCustomerAdd(newCustomer: Customer) {
    newCustomer.id = (++this.id).toString();
    this.toastr.success('A new customer has been added!', 'New Customer');
  }

  onPageChanged(event: MyPager) {
    this.orderedCustomers = event.pageOfItems;
    console.log("ordered: ", this.orderedCustomers);
  }

  getArrowClass(columnNameClicked: SortColumnsInClients): IconDefinition {
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

  sortList(columnNameClicked: SortColumnsInClients) {
    if (columnNameClicked === this.selectedColumnName) {
      this.isAsc = !this.isAsc;
    } else {
      this.selectedColumnName = columnNameClicked;
      this.isAsc = true;
    }

    this.sort();
  }


  sort() {
    switch (this.selectedColumnName) {
      case SortColumnsInClients.FullName:
          this.customerObjectList = JSON.parse(JSON.stringify(
            SortHelper.sortingOfElements(this.customerObjectList, 'name', this.isAsc)));
         
        break;

      case SortColumnsInClients.Sex:
          this.customerObjectList = JSON.parse(JSON.stringify(
            SortHelper.sortingOfElements(this.customerObjectList, 'gender', this.isAsc )));
        break;

      case SortColumnsInClients.Age:
        let copyOfCustomers = JSON.parse(JSON.stringify(this.customerObjectList));
        this.customerObjectList = JSON.parse(JSON.stringify(
          SortHelper.sortingOfElements(copyOfCustomers, 'age', this.isAsc )));

        break;

      case SortColumnsInClients.City:
          this.customerObjectList = JSON.parse(JSON.stringify(
            SortHelper.sortingOfElements(this.customerObjectList, 'address', this.isAsc)));
        break;

      default:     
        this.customerObjectList = JSON.parse(JSON.stringify(
          SortHelper.sortingOfElements(this.customerObjectList, 'name', this.isAsc)));
       break;
    }
  }

}

export enum SortColumnsInClients{
  Id = 0,
  FullName,
  Sex,
  Age,
  City,
}