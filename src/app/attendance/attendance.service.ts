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

  

}