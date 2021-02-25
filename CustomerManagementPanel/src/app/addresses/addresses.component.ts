import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash, faInfo, faPlusSquare, faFilter, faSort, faSortUp, IconDefinition, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { Address } from '../clients/models/address';
import { SortHelper } from '../shared/helpers/sort-helper';
import { MyPager, OrderedItem } from '../shared/models/shared.models';
import { AddressesService } from './addresses.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
  })
export class AddressesComponent implements OnInit {
  addressesList: Address[] = [];
  ordersListInitial: Address[] = [];
  orderedAddresses: BehaviorSubject<OrderedItem[]> = new BehaviorSubject<OrderedItem[]>(null);
  id: number = 1;
  pageSizeFromOrders = 15;
  addressOrdersToShow: Observable<OrderedItem[]>;
  selectedColumnName: SortColumn;
  SortColumns: typeof SortColumn = SortColumn;
  FilterColumn : typeof FilterColumn = FilterColumn;
  selectedColumnNameFilter : FilterColumn = FilterColumn.Country;
  filterClick: boolean = false;
  ZipCodeValue: number;
  StreetValue: string;
  CityValue: string;
  CountryValue: string;

  faTrash = faTrash;
  faInfo = faInfo;
  faPlusSquare = faPlusSquare;
  faFilter = faFilter;
  faSort: IconDefinition = faSort;
  faSortUp: IconDefinition = faSortUp;
  faSortDown: IconDefinition = faSortDown;
  isAsc: boolean;

    constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private addressService: AddressesService
    ) { 
      this.route.data.subscribe((value) => {
        this.ordersListInitial = value['addressesList'];
      })
      this.addressesList = JSON.parse(JSON.stringify(this.ordersListInitial));
    }
  
    ngOnInit(): void {
      this.addressOrdersToShow = this.orderedAddresses.asObservable();
      this.route.data.subscribe(data => 
        this.addressesList = data['addressesList']);
        console.log(this.addressesList);
    }

    addressDelete(addressId:string){
        this.addressService.delete(addressId)
        .subscribe(response => {
            let index = this.addressesList.findIndex(address => address.id == addressId)
            this.addressesList.splice(index ,1);
        });
    }
  
    onPageChanged(event: MyPager) {
      this.orderedAddresses.next(event.pageOfItems);
      console.log("zmień coś")
    }

    changePageSize(filterVal: number) {
      this.pageSizeFromOrders = filterVal;
      console.log(this.pageSizeFromOrders);
    }

    isFilterHidden(columnName: FilterColumn) : Boolean {
      return this.selectedColumnNameFilter !== columnName || !this.filterClick
    }

    onKeyUpEvent(valueFornInput) {
      setTimeout( () => {
        this.filter(valueFornInput) },  300);
    }

    filter(valueForInput){
      switch (this.selectedColumnNameFilter){
        case FilterColumn.Country:
          let filterInColumnOne = this.ordersListInitial.filter(address => address.country.name.toLowerCase().includes(valueForInput.toLowerCase()))
          if (filterInColumnOne === []){
          }else{
            this.addressesList = JSON.parse(JSON.stringify(filterInColumnOne));
          }
        break;     

        case FilterColumn.City:
          let filterInColumnTwo = this.ordersListInitial.filter(address => address.city.toLowerCase().includes(valueForInput.toLowerCase()))
          if (filterInColumnOne === []){
          }else{
            this.addressesList = JSON.parse(JSON.stringify(filterInColumnTwo));
          }
        break;  

        case FilterColumn.ZipCode:
          let filterInColumnThree = this.ordersListInitial.filter(address => address.zipCode.toString().toLowerCase().includes(valueForInput.toLowerCase()))
          if (filterInColumnOne === []){
          }else{
            this.addressesList = JSON.parse(JSON.stringify(filterInColumnThree));
          }
        break;  

        case FilterColumn.Street:
          let filterInColumnFour = this.ordersListInitial.filter(address => address.street.toLowerCase().includes(valueForInput.toLowerCase()))
          if (filterInColumnOne === []){
          }else{
            this.addressesList = JSON.parse(JSON.stringify(filterInColumnFour));
          }
        break;  
  
        default:
      }
    }

    sortList(columnNameClicked: SortColumn) {
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
        case SortColumn.Country:
  
          this.addressesList = JSON.parse(
            JSON.stringify(
              SortHelper.sortingOfElements(
                this.addressesList,
                'country',
                this.isAsc
              )
            )
          );
          console.log("tutaj lista sortowana" ,this.addressesList)
          break;
  
        case SortColumn.City:

          if (this.isAsc) {
            this.addressesList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.addressesList, 'city' )));
            } else {
              this.addressesList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.addressesList, 'city', false )));
            }
          break;

        case SortColumn.ZipCode:
          if (this.isAsc) {
            this.addressesList.sort((a, b) => a.zipCode - b.zipCode);
          } else {
            this.addressesList.sort((a, b) => b.zipCode - a.zipCode);
          }
          this.addressesList = JSON.parse(JSON.stringify(this.addressesList));
          break;
        case SortColumn.Street:
  
          if (this.isAsc) {
            this.addressesList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.addressesList, 'street' )));
            } else {
              this.addressesList = JSON.parse(JSON.stringify(SortHelper.sortingOfElements(this.addressesList, 'street', false )));
            }
          break;
  
        default:
      }
    }

    getArrowClass(columnNameClicked: SortColumn): IconDefinition {
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

    switchFilterShow(columnNameClicked: FilterColumn){
      if (columnNameClicked === this.selectedColumnNameFilter) {
        this.filterClick = !this.filterClick;
        } else {
          this.selectedColumnNameFilter = columnNameClicked;
          this.filterClick = true;
        }
    }
}

export enum SortColumn {
  Id = 0,
  Country,
  City,
  ZipCode,
  Street,
}

export enum FilterColumn {
  Country,
  City,
  ZipCode,
  Street,
}