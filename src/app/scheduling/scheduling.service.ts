import { DefaultInterface } from './../shared/models/default-interface.model';
import { Scheduling, SchedulingDetails } from './models/scheduling.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedItems } from 'app/shared/models/paginated-items.model';
import { APPLICATION_API } from 'app/app.api';
import { ThrowStmt } from '@angular/compiler';
import { Customer } from 'app/customer/models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  constructor(private httpClient: HttpClient) { }

  getAll(page: number, startDate: string, finishDate: string, customerId: string): Promise<PaginatedItems<Scheduling>> {
    return new Promise<PaginatedItems<Scheduling>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/schedules?page=${page}&startDate=${startDate}&finishDate=${finishDate}&customer=${customerId}`)
        .subscribe((response: PaginatedItems<Scheduling>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getById(id: string): Promise<SchedulingDetails> {
    return new Promise<SchedulingDetails>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/schedules/${id}`)
        .subscribe((response: SchedulingDetails) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getServiceType(): Promise<Array<DefaultInterface<number>>> {
    return new Promise<Array<DefaultInterface<number>>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/resources/servicesType`)
        .subscribe((response: Array<DefaultInterface<number>>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  create(obj: SchedulingDetails) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.post(`${APPLICATION_API}/schedules`, obj)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  update(id: string, obj: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(`${APPLICATION_API}/schedules/${id}`, obj)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getCustomers(): Promise<PaginatedItems<Customer>> {
    let page: number = 1;
    let pageSize: number = 100;
    let status: boolean = true;

    return new Promise<PaginatedItems<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/customers?page=${page}&pageSize=${pageSize}&status=${status}&search=`)
        .subscribe((response: PaginatedItems<Customer>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  delete(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.delete(`${APPLICATION_API}/schedules/${id}`)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getByPeriod(inicialDate: string, finalDate: string): Promise<any> {

    console.log('inicialdate', inicialDate)
    console.log('finaldate', finalDate)

    return new Promise<any>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/schedules/internal/byPeriod?initialDate=${inicialDate}&finalDate=${finalDate}`)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}
