import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ConfigService } from "./config.service";
import { catchError } from 'rxjs/operators';
import { orderData } from '../interfaces/order';
 


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderItems: orderData[] = [];
  constructor(
    private http: HttpClient,
    private appConfig: ConfigService
  ) { }

  /**
   * Method to call the getOrderDetails API and return the data
   * @param params 
   * @returns 
   */
  getOrderData(params?: Object): Observable<any> {
    return this.http
      .get(this.getApiUrl(<string>this.appConfig.getPath('getOrders'), params))
      .pipe(
        catchError(this.errorHandler));
  }

  /**
   * Method to call the addOrderDetails API to add the order
   * @param params 
   * @returns 
   */
  addOrderData(params?: Object): Observable<any> {
    return this.http
      .post(this.getApiUrl(<string>this.appConfig.getPath('addOrder')), JSON.stringify(params))
      .pipe(
        catchError(this.errorHandler));
  }

  /**
   * Method to call the editOrderDetails API to update the order
   * @param params 
   * @returns 
   */
  updateOrderData(params?: Object): Observable<any> {
    return this.http
      .post(this.getApiUrl(<string>this.appConfig.getPath('updateOrder')), JSON.stringify(params))
      .pipe(
        catchError(this.errorHandler));
  }

  /**
   * Method to call the deleteOrderDetails API to delete the order
   * @param params 
   * @returns 
   */
   deleteOrderData(params?: Object): Observable<any> {
    return this.http
      .post(this.getApiUrl(<string>this.appConfig.getPath('deleteOrder')), JSON.stringify(params))
      .pipe(
        catchError(this.errorHandler));
  }

  /**
   * Method to get the API url from Config service
   * @param path 
   * @param params 
   * @returns 
   */
  getApiUrl(path: string, params?: Object) {
    let url = path;
    if (params instanceof Object) {
      url += '?';
      Object.entries(params).forEach(([param, value]) => {
        url += `${encodeURIComponent(param)}=${encodeURIComponent(value)}&`;
      })
    }
    return url;
  }

  /**
   * Errors handler
   * function for error handling
   * @param error 
   * @returns  
   */
   errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get the client-side errors
      errorMessage = error.error.message;
    } else {
      // Get the server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

}
