import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsService } from './clients.service';
import { Address } from './models/address';
import { Customer } from './models/customer';

@Injectable()
export class ClientEditResolver implements Resolve<Customer>{

    constructor(private clientsService: ClientsService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer>{
        const id: string = route.paramMap.get('id');
        let customer: Customer = null;

        if(id === "0"){
            console.log("creating client from resolver...");
            let address: Address =  {
                id: "",
                city: "",
                zipCode: 0,
                street: "",
                country: ""
               };

            customer = new Customer("", "", "", 0, 0, address, "", "", "");
        }else{
            console.log("fetching client from resolver...");
           return this.clientsService.getById(id);
        }
        return of(customer);
    }

}
