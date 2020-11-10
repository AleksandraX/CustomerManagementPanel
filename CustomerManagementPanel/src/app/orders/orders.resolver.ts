import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Orders } from '../clients/models/orders';
import { OrdersService } from './orders.service';

@Injectable()
export class OrdersResolver implements Resolve<Orders[]>{

    constructor(private ordersService: OrdersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Orders[]>{
        const id: string = route.paramMap.get('id');
        let orders: Orders[] = [ {id: "1", orderedByCustomerId: "Kacper Bergański", price: 123,  orderedDate: new Date(2020, 10, 1), lastUpdateDate: new Date(2020, 10, 1), status: "ready"}]
       // return this.ordersService.getAll();

       return of(orders);
    }

}
