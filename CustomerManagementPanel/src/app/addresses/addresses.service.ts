import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Address, AddressForCreation, AddressWithResidents, Country } from '../clients/models/address';

@Injectable()

export class AddressesService {

    baseUrl: string = environment.apiBaseUrl + "addresses";
    headers: Headers = null;
    options;

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }


    getAllAddresses() : Observable<Address[]> {
        return this.httpClient.get<Address[]>(this.baseUrl + "/GetAll").pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<Address[]>("getAllAddresses"))
        );  
    }

    getById(id) : Observable<Address> {
        return this.httpClient.get<Address>(this.baseUrl + "/getById/" + id).pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<Address>("getById"))
        );
    }

    getAddressWithResidents(id) : Observable<AddressWithResidents> {
        return this.httpClient.get<AddressWithResidents>(this.baseUrl + "/GetAddressWithResidents/" + id).pipe(
            tap(response =>
                {
                    console.log("AddressWithResidents from services:", response);
                }),
            catchError(this.handleError<AddressWithResidents>("AddressWithResidents"))
        );
    }

    getAllCountries() : Observable<Country[]>{
        return this.httpClient.get<Country[]>(this.baseUrl + "/GetAllCountries").pipe(
          tap(response =>
              {
                  console.log("From services:", response);
              }),
          catchError(this.handleError<Country[]>("GetAllCountries"))
      );  
      }


    delete(id: string) : Observable<any> {
        return this.httpClient.delete<any>(this.baseUrl + "/delete/" + id).pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<any>("delete"))
        ); 
    }

    create(addressForCreation: AddressForCreation) : Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + "/Create", addressForCreation).pipe(
            tap(response =>
                {
                    console.log("Create address", response);
                }),
            catchError(this.handleError<any>("create"))
        );
    }

    handleError<T>(operation, result?: T){
        return (error: any): Observable<T> => {
            console.error(operation);
            console.error(error);
            return of(result as T);
    };
}
}