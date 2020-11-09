import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Customer } from './models/customer';
import { CUSTOMERLIST } from './models/customer-list';

@Injectable()
export class ClientEditResolver implements Resolve<Customer>{

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer{
        const id: number = +route.paramMap.get('id');
        let customer: Customer = null;

        if(id === 0){
            customer = new Customer(0, "","", 0, "", {id: 0,city:"", zipCode:0, street:"", country:"" }, 0, "");
        }else{
            customer = CUSTOMERLIST.find(c => c.id == id);
        }
        return customer;
    }

}
