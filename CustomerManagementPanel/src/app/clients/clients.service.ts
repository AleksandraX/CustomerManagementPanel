import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { CustomerForCreation } from './models/customerForCreation';
import { environment } from 'src/environments/environment';

@Injectable()

export class ClientsService {

    baseUrl: string = environment.apiBaseUrl + "customers";
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

    getById(id: string) : Observable<Customer> {
        return this.httpClient.get<Customer>(this.baseUrl + "/getById/" + id).pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<Customer>("getById"))
        );
    }

    create(customerForCreation: CustomerForCreation) : Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + "/CreateCustomer", customerForCreation).pipe(
            tap(response =>
                {
                    console.log("Create customer", response);
                }),
            catchError(this.handleError<any>("create"))
        );
    }

    updateCustomer(customerForCreation: CustomerForCreation) : Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + "/UpdateCustomer", customerForCreation).pipe(
            tap(response =>
                {
                    console.log("Update Customer", response);
                }),
            catchError(this.handleError<any>("update"))
        );
    }

    delete(customerId: string) : Observable<any> {
        return this.httpClient.delete<any>(this.baseUrl + "/delete/" + customerId).pipe(
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
