import { ServiceType } from './models/attendance.model';
import { APPLICATION_API } from './../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultInterface } from 'app/shared/models/default-interface.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) { }

  getServicesType(): Promise<Array<DefaultInterface<number>>> {
    return new Promise<Array<DefaultInterface<number>>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/resources/servicesType`)
        .subscribe((response: Array<DefaultInterface<number>>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }
  
}