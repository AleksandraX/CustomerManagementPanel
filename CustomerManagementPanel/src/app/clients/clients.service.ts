import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { CustomerForCreation } from './models/customerForCreation';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Injectable()

export class ClientsService {

    baseUrl: string = "http://customermanagmentportalapi.azurewebsites.net/api/customers";
    headers: Headers = null;
    options;

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }


    getAllClients() : Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(this.baseUrl + "/getall").pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<Customer[]>("getAllCustomers"))
        );
    
    }

    getById(id) : Observable<Customer> {
        return this.httpClient.get<Customer>(this.baseUrl + "/getById/" + id).pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<Customer>("getById"))
        );
    }

    create(customerForCreation: CustomerForCreation) : Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + "/createCustomer", customerForCreation).pipe(
            tap(response =>
                {
                    console.log("Create customer", response);
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
