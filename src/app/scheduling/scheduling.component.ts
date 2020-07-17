import { NotificationService } from './../shared/notification/notification.service';
import { SchedulingService } from './scheduling.service';
import { Pager } from './../shared/models/paginated-items.model';
import { Scheduling } from './models/scheduling.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import moment = require('moment');

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  displayedColumns = ['date', 'timeTable', 'customer', 'action'];
  schedules: Array<Scheduling>;
  pager: Pager;

  constructor(private _schedulingService: SchedulingService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    this.getSchedules(1);
  }

  getSchedules(page: number): void {
    this.spinner.show();
    this._schedulingService.getAll(page)
      .then(result => {
        if (result) {
          this.pager = result.pager;
          this.schedules = result.data;

          this.schedules.forEach(x => {
            x.date = moment(x.date).format("DD/MM/YYYY");
          });
        }
        else {
          this.schedules = undefined;
        }
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar as consultas.', 'error')
      })
  }
}
