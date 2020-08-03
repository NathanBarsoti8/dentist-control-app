import { ConfirmDialogData } from './../customer/models/confirm-dialog.model';
import { SchedulingDeleteComponent } from './scheduling-delete/scheduling-delete.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../shared/notification/notification.service';
import { SchedulingService } from './scheduling.service';
import { Pager } from './../shared/models/paginated-items.model';
import { Scheduling, Status } from './models/scheduling.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  displayedColumns = ['date', 'timeTable', 'customer', 'status', 'action'];
  schedules: Array<Scheduling>;
  pager: Pager;
  deleteDialogRef: MatDialogRef<SchedulingDeleteComponent>;

  constructor(private _schedulingService: SchedulingService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private matDialog: MatDialog) { }

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
            if (x.statusId == Status.SCHEDULED)
              x.status = "Agendada";
            else if (x.statusId == Status.DONE)
              x.status = "Concluída";
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

  confirmDialog(scheduleId: string): void {
    this.deleteDialogRef = this.matDialog.open(SchedulingDeleteComponent, {
      width: '500px',
      height: '210px',
      data: {
        id: scheduleId
      }
    });

    this.deleteDialogRef.afterClosed()
      .subscribe((response: ConfirmDialogData) => {
        this.onDeleteModalClosed(response);
      });
  }

  onDeleteModalClosed(response: ConfirmDialogData): void {
    if (response.isConfirmed)
      this.deleteSchedule(response.id);
  }

  deleteSchedule(id: string): void {
    this.spinner.show();
    this._schedulingService.delete(id)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Consulta excluída com sucesso.', 'info');
        this.getSchedules(1);
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao excluir consulta.', 'error')
      });
  }

}
