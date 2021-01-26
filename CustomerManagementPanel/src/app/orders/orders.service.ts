import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { Order, OrdersForCreation, OrderStatus, OrderStatusChangeParameters } from '../clients/models/orders';
import { environment } from './../../environments/environment';


@Injectable()

export class OrdersService {

    baseUrl: string =  environment.apiBaseUrl + "orders/";
    headers: Headers = null;
    options: { headers: Headers; };

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }

 getAllListItems() : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.baseUrl + "GetAllListItems").pipe(
        tap(response =>
            {
                console.log("From services:", response);
            }),
        catchError(this.handleError<Order[]>("getAllCustomers"))
    );  
}

create(ordersForCreation: OrdersForCreation) : Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + "CreateOrder", ordersForCreation).pipe(
        tap(response =>
            {
                console.log("Create orders", response);
            }),
        catchError(this.handleError<any>("CreateOrder"))
    );
}

    getAllOrderStatus() : Observable<OrderStatus[]>{
        return this.httpClient.get<OrderStatus[]>(environment.apiBaseUrl + "orderStatuses/getAll").pipe(
            tap(response =>
                {
                    console.log("From services:", response);
                }),
            catchError(this.handleError<OrderStatus[]>("getAllOrderStatus"))
        );  
    };

    changeOrderStatus(orderStatusChangeParameters: OrderStatusChangeParameters): Observable<any>{
        let params = new HttpParams();
        params = params.append("OrderId", orderStatusChangeParameters.orderId);
        params = params.append('NewOrderStatusId', orderStatusChangeParameters.newOrderStatusId);

        return this.httpClient.put<any>(this.baseUrl + "ChangeOrderStatus",  null, { params: params }).pipe(
            tap(response =>
                {
                    console.log("Save Status", response);
                }),
            catchError(this.handleError<any>("putOrderStatus"))
        );
    };


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