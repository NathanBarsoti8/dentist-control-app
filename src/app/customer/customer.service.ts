import { APPLICATION_API } from './../app.api';
import { Customer } from './models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Promise<Array<Customer>> {
    return new Promise<Array<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/clients`)
        .subscribe((response: Array<Customer>) => {
          resolve(response)
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }
  
}
