import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder } from '../shared/interfaces';

@Injectable()
export class DataService {

  baseUrl: string = 'assets/';
  
  constructor(private http: HttpClient) { }

  getCustomers() : Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json').pipe(
      catchError(this.handleError)
    );
  }

  getCustomer(id: any) : Observable<ICustomer> {
    return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json').pipe(
      map((customers) => {
        let customer = customers.filter((cust: ICustomer) => cust.id === id);
        return (customer && customer.length) ? customer[0] : {
          id: -1,
          name: "no-one",
          city: "No City",
          orderTotal: -1,
          customerSince: "Never"
        }
      }),
      /* map((customers) => {
        let customer = customers.filter((cust: ICustomer) => cust.id === id);
        return (customer && customer.length) ? customer[0] : null;
      }), */
      catchError(this.handleError)
    );
  }

  getOrders(id: any) : Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.baseUrl + 'customers.json').pipe(
      map(orders => {
        let custOrders = orders.filter((order: IOrder) => order.customerId === id);
        return custOrders;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any){
    console.error('Server Error: ', error);
    if(error.error instanceof Error){
      const errorMessage = error.error.message;
      return Observable.throw(errorMessage);
    }
    return Observable.throw(error || "Node.js server error");
  }

}
