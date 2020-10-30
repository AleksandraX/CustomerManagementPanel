import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ClientsService } from './clients.service';
import { Customer } from './models/customer';
import { CUSTOMERLIST } from './models/customer-list';


@Injectable()
export class ClientListResolver implements Resolve<Customer[]> {
    customers: Customer[];

    constructor(private clientsService: ClientsService) {
        
    }
    resolve(): Customer[] {
         this.clientsService.getAllClients().subscribe(response => {
            console.log("Resolver: ", response);

            this.customers = response;
        });
        return this.customers;
    }

};
