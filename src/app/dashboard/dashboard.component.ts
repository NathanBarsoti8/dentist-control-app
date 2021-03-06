import { DateConverterService } from 'app/shared/services/dateConverter.service';
import { NotificationService } from './../shared/notification/notification.service';
import { Customers, CustomerBirthday } from './models/birthdays.model';
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
  displayedColumnsSchedules = ['timeTable', 'customer', 'serviceType', 'whatsapp'];
  customersBirthday: Array<Customers>;
  userDate: number = new Date().getDate();
  todaySchedules: Array<SchedulesByDay>;
  tomorrowSchedules: Array<SchedulesByDay>;
  date: Date = new Date();
  businessDay: string;
  nextBusinessDay: string;

  constructor(private _dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService) { }

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
    this.businessDay = moment(today).format("DD/MM/YYYY");
    this.spinner.show();
    this._dashboardService.getSchedulesByDay(today)
      .then(result => {
        if (result) {
          this.todaySchedules = result;
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
    let day = new Date().getDay();
    let tomorrow: moment.MomentInput;

    switch (day) {
      case 5:
        tomorrow = moment(this.date.setDate(this.date.getDate() + 3)).format("YYYY-MM-DD");
        break;
      case 6:
        tomorrow = moment(this.date.setDate(this.date.getDate() + 2)).format("YYYY-MM-DD");
        break;
      default:
        tomorrow = moment(this.date.setDate(this.date.getDate() + 1)).format("YYYY-MM-DD");
        break;
    }

    this.nextBusinessDay = moment(tomorrow).format("DD/MM/YYYY");
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

  renderTitle(param: string): string {
    if (param.toLowerCase() === 'today') {
      return `Consultas de hoje (${this.businessDay})`
    }
    else {
      return `Consultas do próximo dia útil (${this.nextBusinessDay})`
    }
  }

  openWppSchedule(value: SchedulesByDay): void {
    let date = value.date;
    date = this.dateConverter.toLocaleString(date);

    this.spinner.show();
    this._dashboardService.sendWppMessage(value, 'schedule', date)
      .then(result => {
        if (result) {
          window.open(result.wppLink)
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao tentar enviar mensagem.', 'error');
      })
  }

  openWppBirthday(value: CustomerBirthday): void {
    this.spinner.show();
    this._dashboardService.sendWppMessage(value, 'birthday')
      .then(result => {
        if (result) {
          window.open(result.wppLink)
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao tentar enviar mensagem.', 'error');
      })
  }

}
