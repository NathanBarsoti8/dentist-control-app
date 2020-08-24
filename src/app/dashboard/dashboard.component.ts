import { Customers } from './models/birthdays.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['name', 'birthDate', 'icon'];
  customersBirthday: Array<Customers>;
  userDate: number = new Date().getDate();

  constructor(private _dashboardService: DashboardService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMonthBirthdays();
  }

  getMonthBirthdays() {
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

}
