import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Customer } from './models/customer';
import { CUSTOMERLIST } from './models/customer-list';


@Injectable()
export class ClientListResolver implements Resolve<Customer[]> {

    resolve(): Customer[] {
        return CUSTOMERLIST;
    }

};
