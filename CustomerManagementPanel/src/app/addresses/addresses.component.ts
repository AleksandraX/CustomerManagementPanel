import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../clients/models/address';
import { AddressesService } from './addresses.service';


@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
  })
export class AddressesComponent implements OnInit {
  addressesList: Address[];
  id: number = 1;

    constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private addressService: AddressesService
    ) { 
      this.route.data.subscribe(value => {      
        this.addressesList = value["addressesList"];
        console.log(this.addressesList);
      });
    }
  
    ngOnInit(): void {
    }

    addressDelete(addressId:string){
        this.addressService.delete(addressId)
        .subscribe(response => {
            let index = this.addressesList.findIndex(address => address.id == addressId)
            this.addressesList.splice(index ,1);
        });
    }

    addressDetails(addressToDelete:Address){

    }
  
}