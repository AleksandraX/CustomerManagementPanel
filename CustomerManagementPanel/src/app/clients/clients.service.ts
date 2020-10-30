import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './models/customer';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';

@Injectable()

export class ClientsService {

    baseUrl: string = "https://customermanagmentportalapi.azurewebsites.net/api/customers";
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
                    return response;
                }),
            catchError(this.handleError<Customer[]>("getAllCustomers"))
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
