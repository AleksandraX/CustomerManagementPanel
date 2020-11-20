import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCity, faGlobeAmericas, faIdCard, faMailBulk, faRoad } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Address, AddressWithResidents } from 'src/app/clients/models/address';
import { Customer } from 'src/app/clients/models/customer';

@Component({
  selector: 'app-addresses-details',
  templateUrl: './addresses-details.component.html',
  styleUrls: ['./addresses-details.component.scss']
})
export class AddressesDetailsComponent implements OnInit {

  address: AddressWithResidents = null;
  customer: Customer;

  faGlobaleAmericas = faGlobeAmericas;
  faCity = faCity;
  faMailBulk = faMailBulk;
  faRoad = faRoad;
  faIdCard= faIdCard;

  constructor(
    private toastr: ToastrService, 
    private route: ActivatedRoute
  ) { 
    this.route.data.subscribe(value => {
      this.address = value["addressDetails"];
      console.log(value["addressDetails"]);
    });
  } 



  ngOnInit() {
  }

}
