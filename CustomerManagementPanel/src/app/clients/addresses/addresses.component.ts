import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../models/address';


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
      private route: ActivatedRoute
    ) { 
      this.route.data.subscribe(value => {      
        this.addressesList = value["addressesList"];
        console.log(this.addressesList);
      });
    }
  
    ngOnInit(): void {
    }
  
}