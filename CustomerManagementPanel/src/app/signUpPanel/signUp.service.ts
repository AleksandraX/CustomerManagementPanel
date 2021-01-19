import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Address, AddressForCreation, AddressWithResidents } from '../clients/models/address';
import { UserAccountForCreation } from '../clients/models/signUp';

@Injectable()

export class SignUpService {

    baseUrl: string = "https://api.kacper-berganski-portfolio.pl/api/addresses";
    headers: Headers = null;
    options;

constructor(private httpClient:HttpClient) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = { headers: this.headers };
 }

    create(userAccountForCreation: UserAccountForCreation) : Observable<any>{
        return this.httpClient.post<any>(this.baseUrl + "/create", userAccountForCreation).pipe(
            tap(response =>
                {
                    console.log("Create user", response);
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