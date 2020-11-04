import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Address } from '../models/address';
import { AddressesService } from './addresses.service';

@Injectable()
export class AddressesResolver implements Resolve<Address[]> {

    constructor(private addressesService: AddressesService) {
        
    }
    resolve(): Observable<Address[]> {
         return this.addressesService.getAllAddresses();
    }
};
