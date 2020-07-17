import { APPLICATION_API } from './../app.api';
import { Customer, CustomerDetails } from './models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultInterface } from 'app/shared/models/default-interface.model';
import { PaginatedItems } from 'app/shared/models/paginated-items.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getAll(page: number, status: boolean, search?: string): Promise<PaginatedItems<Customer>> {
    return new Promise<PaginatedItems<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/customers?page=${page}&status=${status}&search=${search}`)
        .subscribe((response: PaginatedItems<Customer>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getById(id: string): Promise<CustomerDetails> {
    return new Promise<CustomerDetails>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/customers/${id}`)
        .subscribe((response: CustomerDetails) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getPhoneType(): Promise<Array<DefaultInterface<number>>> {
    return new Promise<Array<DefaultInterface<number>>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/resources/phonesType`)
        .subscribe((response: Array<DefaultInterface<number>>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  create(obj): Promise<CustomerDetails> {
    return new Promise<CustomerDetails>((resolve, reject) => {
      this.httpClient.post(`${APPLICATION_API}/customers`, obj)
        .subscribe((response: CustomerDetails) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  changeStatus(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.put(`${APPLICATION_API}/customers/${id}/changeStatus`, null)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  update(id: string, obj: CustomerDetails): Promise<CustomerDetails> {
    return new Promise<CustomerDetails>((resolve, reject) => {
      this.httpClient.put(`${APPLICATION_API}/customers/${id}/update`, obj)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    })
  }

}
