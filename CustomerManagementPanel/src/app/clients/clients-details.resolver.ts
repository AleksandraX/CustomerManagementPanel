import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from './clients.service';
import { Customer } from './models/customer';

@Injectable()
export class ClientsDetailsResolver implements Resolve<Customer>{

    constructor(private clientsService: ClientsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer>{
        const id: string = route.paramMap.get('id');

        return this.clientsService.getById(id);
    }

}

