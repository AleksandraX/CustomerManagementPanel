import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Address } from '../clients/models/address';

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


    delete(id: string) : Observable<any> {
        return this.httpClient.delete<any>(this.baseUrl + "/delete/" + id).pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<any>("delete"))
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