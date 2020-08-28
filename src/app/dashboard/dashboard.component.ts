import { Customers } from './models/birthdays.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { SchedulesByDay } from './models/schedules.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumnsBirthDay = ['name', 'birthDate', 'icon'];
  displayedColumnsSchedules = ['timeTable', 'customer', 'serviceType'];
  customersBirthday: Array<Customers>;
  userDate: number = new Date().getDate();
  todaySchedules: Array<SchedulesByDay>;
  tomorrowSchedules: Array<SchedulesByDay>;
  date: Date = new Date();

  constructor(private _dashboardService: DashboardService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMonthBirthdays();
    this.getTodaySchedules();
    this.getTomorrowSchedules();
  }

  getMonthBirthdays(): void {
    this.spinner.show();
    this._dashboardService.getMonthBirthdays()
      .then(result => {
        if (result) {
          this.customersBirthday = result.customers;
          this.customersBirthday.forEach(x => {
            x.day = new Date(x.birthDate).getDate() + 1;
            x.birthDate = moment(x.birthDate).format("DD/MM/YYYY");
          });
        }
        else {
          this.customersBirthday = undefined;
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
      });
  }

  getTodaySchedules(): void {
    let today = moment(this.date).format("YYYY-MM-DD");
    this.spinner.show();
    this._dashboardService.getSchedulesByDay(today)
      .then(result => {
        if (result) {
          this.todaySchedules = result;

          console.log(result)
        }
        else {
          this.todaySchedules = undefined;
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
      });
  }

  getTomorrowSchedules(): void {
    let tomorrow = moment(this.date.setDate(this.date.getDate() + 1)).format("YYYY-MM-DD");
    this.spinner.show();
    this._dashboardService.getSchedulesByDay(tomorrow)
      .then(result => {
        if (result) {
          this.tomorrowSchedules = result;
        }
        else {
          this.tomorrowSchedules = undefined;
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
      });
  }

}
