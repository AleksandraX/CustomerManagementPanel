import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { Order } from '../clients/models/orders';

@Injectable()

export class OrdersService {

    baseUrl: string = "https://customermanagmentportalapi.azurewebsites.net/api/orders";
    headers: Headers = null;
    options: { headers: Headers; };

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }

 getAllListItems() : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + "/getAllListItems").pipe(
        tap(response =>
            {
                console.log("From services:", response);
            }),
        catchError(this.handleError<Order[]>("getAllCustomers"))
    );  
}

    getDays(lastUpdateDate: Date, theNumberOfDays: Date){
      // let data1: Date = parseInt(lastUpdateDate);
        // let data2: any = parseInt(theNumberOfDays);
        let data = new Date(Math.abs(lastUpdateDate.getTime() - theNumberOfDays.getTime()));
        return(data.getFullYear() - 1970) + " years " + data.getMonth() + " months " + data.getDate() + " days" ;
    };

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