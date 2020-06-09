import { PaginatedItems } from './../shared/models/paginated-items.model';
import { APPLICATION_API } from './../app.api';
import { Customer, CustomerDetails } from './models/customer.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterCustomer } from './models/filterCustomer.model';
import { DataService } from 'app/shared/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient, private dataService: DataService) { }

  getAll(pageSize: number, pageIndex: number, search?: string): Promise<PaginatedItems<Customer>> {
    return this.dataService.get<PaginatedItems<Customer>>(`${APPLICATION_API}/clients`, {
      params: {
        updates: [
          { param: 'pageSize', value: pageSize.toString() },
          { param: 'pageIndex', value: pageIndex.toString() },
          { param: 'filter', value: search ? search : ''}
        ]
      }
    }) as Promise<PaginatedItems<Customer>>;
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
  
}
