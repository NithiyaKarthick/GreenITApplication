import { Injectable } from '@angular/core';
import {
   Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderService } from "../services/order.service";
import { map, catchError } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<boolean> {
  constructor(
    private dataService: OrderService
  ) {
  }

  /** 
   * To prefetch the data from the server
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean>  {
     return this.dataService.getOrderData()
      .pipe(
        map(data => data),
      catchError(err => {
         throw new Error(err);
        })
     );
  }
}
