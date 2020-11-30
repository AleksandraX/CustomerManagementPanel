import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsService } from 'src/app/clients/clients.service';
import { Customer } from 'src/app/clients/models/customer';
import { Order } from 'src/app/clients/models/orders';

@Injectable()
export class OrdersAddResolver implements Resolve<Customer[]>{

        customers: Customer[];
    
        constructor(private clientsService: ClientsService) {
            
        }
        resolve(): Observable<Customer[]> {
             return this.clientsService.getAllClients();
        }

}