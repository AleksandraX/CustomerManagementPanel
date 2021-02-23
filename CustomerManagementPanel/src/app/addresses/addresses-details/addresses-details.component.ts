import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faCity, faGlobeAmericas, faIdCard, faMailBulk, faRoad } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/clients/clients.service';
import { Address, AddressWithResidents } from 'src/app/clients/models/address';
import { Customer } from 'src/app/clients/models/customer';
import { AddressesService } from '../addresses.service';

@Component({
  selector: 'app-addresses-details',
  templateUrl: './addresses-details.component.html',
  styleUrls: ['./addresses-details.component.scss']
})
export class AddressesDetailsComponent implements OnInit {

  address: AddressWithResidents = null;
  customer: Customer[];

  faGlobaleAmericas = faGlobeAmericas;
  faCity = faCity;
  faMailBulk = faMailBulk;
  faRoad = faRoad;
  faIdCard = faIdCard;
  faArrowLeft = faArrowLeft;

  constructor(
    private toastr: ToastrService, 
    private route: ActivatedRoute,
    private addressesService: AddressesService
  ) { 
  } 

  ngOnInit(): void {
    this.route.data.subscribe(data => 
    this.address = data['addressDetails']);
  }

}
