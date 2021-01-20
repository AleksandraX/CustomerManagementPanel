import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash, faInfo, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../clients/models/address';
import { MyPager, OrderedItem } from '../shared/models/shared.models';
import { AddressesService } from './addresses.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
  })
export class AddressesComponent implements OnInit {
  addressesList: Address[] = [];
  orderedAddresses: OrderedItem[];
  id: number = 1;

  faTrash = faTrash;
  faInfo = faInfo;
  faPlusSquare = faPlusSquare;

    constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private addressService: AddressesService
    ) { 
    }
  
    ngOnInit(): void {
      this.route.data.subscribe(data => 
        this.addressesList = data['addressesList']);
    }

    addressDelete(addressId:string){
        this.addressService.delete(addressId)
        .subscribe(response => {
            let index = this.addressesList.findIndex(address => address.id == addressId)
            this.addressesList.splice(index ,1);
        });
    }
  
    onPageChanged(event: MyPager) {
      this.orderedAddresses = event.pageOfItems;
    }
}