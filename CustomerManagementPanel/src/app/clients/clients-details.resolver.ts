import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { CUSTOMERLIST } from './models/customer-list';

@Injectable()
export class ClientsDetailsResolver implements Resolve<Customer>{

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Customer{
        const id: number = +route.paramMap.get('id');

        let customer = CUSTOMERLIST.find(c => c.id == id);

        console.log("resolver: ", customer);

        return customer; 
    }

}

