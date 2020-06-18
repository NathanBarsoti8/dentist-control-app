import { APPLICATION_API } from './../app.api';
import { Customer, CustomerDetails } from './models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'app/shared/services/data.service';
import { Observable } from 'rxjs';
import { DefaultInterface } from 'app/shared/models/default-interface.model';
import { PaginatedItems } from 'app/shared/models/paginated-items.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  //TO DO: FILTER AND PAGINATION
  // getAll(pageSize: number, pageIndex: number, search?: string): Promise<PaginatedItems<Customer>> {
  //   return this.dataService.get<PaginatedItems<Customer>>(`${APPLICATION_API}/clients`, {
  //     params: {
  //       updates: [
  //         { param: 'pageSize', value: pageSize.toString() },
  //         { param: 'pageIndex', value: pageIndex.toString() },
  //         { param: 'filter', value: search ? search : ''}
  //       ]
  //     }
  //   }) as Promise<PaginatedItems<Customer>>;
  // }

  getAll(page: number): Promise<PaginatedItems<Customer>> {
    return new Promise<PaginatedItems<Customer>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/clients?page=${page}&limit=3`)
        .subscribe((response: PaginatedItems<Customer>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getById(id: string): Promise<CustomerDetails> {
    return new Promise<CustomerDetails>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/clients/${id}`)
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
      this.httpClient.post(`${APPLICATION_API}/clients`, obj)
        .subscribe((response: CustomerDetails) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }
  
}
