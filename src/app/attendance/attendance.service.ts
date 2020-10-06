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

  create(obj: ServiceType): Promise<ServiceType> {
    return new Promise<ServiceType>((resolve, reject) => {
      this.httpClient.post(`${APPLICATION_API}/servicesType`, obj)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  update(obj: ServiceType): Promise<ServiceType> {
    let name = { name: obj.name }

    return new Promise<ServiceType>((resolve, reject) => {
      this.httpClient.put(`${APPLICATION_API}/servicesType/${obj.id}`, name)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    })
  }

  delete(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.delete(`${APPLICATION_API}/servicesType/${id}`)
        .subscribe(() => {
          resolve();
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}