import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  faCheck,
  faEdit,
  faFilter,
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
import { Customer, Gender } from '../models/customer';

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
  ordersListInitial: Customer[] = [];
  orderedCustomers: OrderedItem[] = [];
  isAsc: boolean;
  selectedColumnName: SortColumnsInClients;
  SortColumns: typeof SortColumnsInClients = SortColumnsInClients;
  upArrowIcon: boolean;
  downArrowIcon: boolean;
  bothArrowIcon: boolean;
  selectedColumnNameFilter: FilterColumnsBy = FilterColumnsBy.FullName;
  FilterColumnsBy: typeof FilterColumnsBy = FilterColumnsBy;
  filterClick: boolean = false;
  myInputValue: string;
  EmptyValue: any;
  AgeValueTwo: number;
  AgeValueOne: number;
  GenderValue: boolean;
  CityValue: string;
  selectedColumnGender: FilterGender;

  faTrash = faTrash;
  faEdit = faEdit;
  faInfo = faInfo;
  faPlusSquare = faPlusSquare;
  faSortUp = faSortUp;
  faSortDown = faSortDown;
  faSort = faSort;
  faFilter = faFilter;
  faCheck = faCheck;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private clientService: ClientsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((value) => {
      this.customerObjectList = value['customerList'];
      this.ordersListInitial = value['customerList'];
      this.customerObjectList = JSON.parse(
        JSON.stringify(this.ordersListInitial)
      );

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
    console.log('Customers: ', this.orderedCustomers);
  }

  isFilterHidden(columnName: FilterColumnsBy): Boolean {
    return this.selectedColumnNameFilter !== columnName || !this.filterClick;
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

  switchFilterShow(columnNameClicked: FilterColumnsBy) {
    if (columnNameClicked === this.selectedColumnNameFilter) {
      this.filterClick = !this.filterClick;
    } else {
      this.selectedColumnNameFilter = columnNameClicked;
      this.filterClick = true;
    }
  }

  onKeyUpEvent(valueFornInput, valueForInput2) {
    console.log(valueFornInput);
    setTimeout(() => {
      this.filter(valueFornInput, valueForInput2);
    }, 200);
  }

  filter(valueForInput, valueForInput2) {
    switch (this.selectedColumnNameFilter) {
      case FilterColumnsBy.FullName:
        let filterInColumnOne = this.ordersListInitial.filter((customer) =>
          customer.name.toLowerCase().includes(valueForInput.toLowerCase())
        );
        if (filterInColumnOne === []) {
        } else {
          this.customerObjectList = JSON.parse(
            JSON.stringify(filterInColumnOne)
          );
        }
        break;

      case FilterColumnsBy.Sex:
        let filterInColumnTwo = this.ordersListInitial.filter(
          (customer) =>
            customer.gender ==
            (valueForInput == 0 ? Gender.male : Gender.female)
        );
        this.customerObjectList = JSON.parse(JSON.stringify(filterInColumnTwo));
        break;

      case FilterColumnsBy.Age:
        let fromAge = valueForInput;
        let toAge = valueForInput2;
        let filterInColumnThree = this.ordersListInitial.filter(
          (customer) => customer.age >= fromAge && customer.age <= toAge
        );
        this.customerObjectList = JSON.parse(
          JSON.stringify(filterInColumnThree)
        );
        break;

      case FilterColumnsBy.City:
        let filterInColumnFour = this.ordersListInitial.filter((customer) =>
          customer.address.city
            .toLowerCase()
            .includes(valueForInput.toLowerCase())
        );
        if (filterInColumnFour === []) {
        } else {
          this.customerObjectList = JSON.parse(
            JSON.stringify(filterInColumnFour)
          );
        }
        break;

      default:
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
        this.customerObjectList = JSON.parse(
          JSON.stringify(
            SortHelper.sortingOfElements(
              this.customerObjectList,
              'name',
              this.isAsc
            )
          )
        );

        break;

      case SortColumnsInClients.Sex:
        this.customerObjectList = JSON.parse(
          JSON.stringify(
            SortHelper.sortingOfElements(
              this.customerObjectList,
              'gender',
              this.isAsc
            )
          )
        );
        break;

      case SortColumnsInClients.Age:
        let copyOfCustomers = JSON.parse(
          JSON.stringify(this.customerObjectList)
        );
        this.customerObjectList = JSON.parse(
          JSON.stringify(
            SortHelper.sortingOfElements(copyOfCustomers, 'age', this.isAsc)
          )
        );

        break;

      case SortColumnsInClients.City:
        this.customerObjectList = JSON.parse(
          JSON.stringify(
            SortHelper.sortingOfElements(
              this.customerObjectList,
              'address',
              this.isAsc
            )
          )
        );
        break;

      default:
        this.customerObjectList = JSON.parse(
          JSON.stringify(
            SortHelper.sortingOfElements(
              this.customerObjectList,
              'name',
              this.isAsc
            )
          )
        );
        break;
    }
  }
}

export enum SortColumnsInClients {
  Id = 0,
  FullName,
  Sex,
  Age,
  City,
}

export enum FilterColumnsBy {
  FullName,
  Sex,
  Age,
  City,
}

export enum FilterGender {
  Female,
  Male,
}
