import { CustomerBirthday } from './models/birthdays.model';
import { APPLICATION_API } from './../app.api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchedulesByDay } from './models/schedules.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getMonthBirthdays(): Promise<CustomerBirthday> {
    return new Promise<CustomerBirthday>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/dashboard/birthdays`)
        .subscribe((response: CustomerBirthday) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

  getSchedulesByDay(day: string): Promise<Array<SchedulesByDay>> {
    return new Promise<Array<SchedulesByDay>>((resolve, reject) => {
      this.httpClient.get(`${APPLICATION_API}/dashboard/schedules?day=${day}`)
        .subscribe((response: Array<SchedulesByDay>) => {
          resolve(response);
        }, reject);
    }).catch(error => {
      return Promise.reject(error);
    });
  }

}