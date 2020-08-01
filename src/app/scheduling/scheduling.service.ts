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

  getAll(page: number): Promise<PaginatedItems<Scheduling>> {
    return new Promise<PaginatedItems<Scheduling>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/schedules?page=${page}`)
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

  update(id: string, obj: SchedulingDetails) {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.put(`${APPLICATION_API}/schedules/${id}`, obj)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getCustomers(): Promise<Array<Customer>> {
    let page: number = 1;
    let pageSize: number = 100;
    let status: boolean = true;

    return new Promise<Array<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/customers?page=${page}&pageSize=${pageSize}&status=${status}`)
        .subscribe((response: Array<Customer>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}
