import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Address, AddressForCreation, AddressWithResidents } from '../clients/models/address';

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

    getAddressWithResidents(id) : Observable<AddressWithResidents> {
        return this.httpClient.get<AddressWithResidents>(this.baseUrl + "/GetAddressWithResidents/" + id).pipe(
            tap(response =>
                {
                    console.log("AddressWithResidents from services:", response);
                }),
            catchError(this.handleError<AddressWithResidents>("AddressWithResidents"))
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
        return this.httpClient.post<any>(this.baseUrl + "/create", addressForCreation).pipe(
            tap(response =>
                {
                    console.log("Create address", response);
                }),
            catchError(this.handleError<any>("create"))
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