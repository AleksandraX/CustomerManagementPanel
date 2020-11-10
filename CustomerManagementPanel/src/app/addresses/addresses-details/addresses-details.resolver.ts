import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Address, AddressWithResidents } from 'src/app/clients/models/address';
import { AddressesService } from '../addresses.service';

@Injectable()
export class AddressesDetailsResolver implements Resolve<AddressWithResidents>{

    constructor(private addressesService: AddressesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AddressWithResidents>{
        const id: string = route.paramMap.get('id');

        return this.addressesService.getAddressWithResidents(id);
    }

}
