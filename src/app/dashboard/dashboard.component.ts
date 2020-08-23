import { Customer } from 'app/customer/models/customer.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customers: Array<Customer>;

  constructor(private _dashboardService: DashboardService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getMonthBirthdays();
  }

  getMonthBirthdays(): void {
    this.spinner.show();
    this._dashboardService.getMonthBirthdays()
      .then(result => {
        if (result) {
          this.customers = result
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
      });
  }

}
