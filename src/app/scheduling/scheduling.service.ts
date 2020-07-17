import { Scheduling } from './models/scheduling.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedItems } from 'app/shared/models/paginated-items.model';
import { APPLICATION_API } from 'app/app.api';

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

  
}
