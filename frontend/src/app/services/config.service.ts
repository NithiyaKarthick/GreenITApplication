import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl:string = 'http://product-csv.com';
  apiPaths:any = {
    getOrders: '/Order/getOrderDetails',
    addOrder: '/Order/addOrderDetails',
    updateOrder: '/Order/editOrderDetails',
    deleteOrder: '/Order/deleteOrderDetails'
  };
  constructor() { }

  getPath(name:string) {
    let path = this.apiPaths[name] ? this.apiPaths[name] : null;
    if(path) {
      return this.apiUrl+path;
    }
    return null;
  }
}
