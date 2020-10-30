import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from './clients.service';
import { Customer } from './models/customer';



@Injectable()
export class ClientListResolver implements Resolve<Customer[]> {
    customers: Customer[];

    constructor(private clientsService: ClientsService) {
        
    }
    resolve(): Observable<Customer[]> {
         return this.clientsService.getAllClients();
    }
};
