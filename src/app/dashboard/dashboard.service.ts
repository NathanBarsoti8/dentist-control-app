import { Customer } from 'app/customer/models/customer.model';
import { APPLICATION_API } from './../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getMonthBirthdays(): Promise<Array<Customer>> {
    return new Promise<Array<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/dashboard/birthdays`)
        .subscribe((response: Array<Customer>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}