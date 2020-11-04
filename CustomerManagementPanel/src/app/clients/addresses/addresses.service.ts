import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Address } from '../models/address';
import { Customer } from '../models/customer';

@Injectable()

export class AddressesService {

    baseUrl: string = "https://customermanagmentportalapi.azurewebsites.net/api/addresses";
    headers: Headers = null;
    options;

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }


    getAllAddresses() : Observable<Address[]> {
        return this.httpClient.get<Address[]>(this.baseUrl + "/getAll").pipe(
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

    handleError<T>(operation, result?: T){
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(operation);
            console.error(error); // log to console instead
       
            // Let the app keep running by returning an empty result.
            return of(result as T);
    };
}

}