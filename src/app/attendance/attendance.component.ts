import { ConfirmDialogData } from './../customer/models/confirm-dialog.model';
import { NotificationService } from 'app/shared/notification/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ServiceType } from './models/attendance.model';
import { AttendanceService } from './attendance.service';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  displayedColumns = ['name', 'action'];
  servicesType: Array<ServiceType>;
  deleteDialogRef: MatDialogRef<AttendanceComponent>;
  deleteObj: ConfirmDialogData = { id: null, isConfirmed: null } as ConfirmDialogData;
  @ViewChild('deleteServiceType', { static: true}) deleteServiceType: TemplateRef<this>;
  
  // dialogRef: MatDialogRef<AttendanceComponent>;
  // @ViewChild('createServiceType', { static: true }) createServiceType: TemplateRef<this>;

  constructor(private _attendanceService: AttendanceService,
    // private formBuilder: FormBuilder,
    // private router: Router,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getServicesType();
  }

  getServicesType(): void {
    this.spinner.show();
    this._attendanceService.getServicesType()
      .then(result => {
        if (result) {
          this.servicesType = result;
        }
        else {
          this.servicesType = undefined;
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os tipos de serviço.', 'error');
      });
  }

  confirmDialog(serviceId: string): void {
    this.deleteObj.id = serviceId;
    this.deleteDialogRef = this.matDialog.open(this.deleteServiceType, {
      width: '500px',
      height: '210px',
    });

    this.deleteDialogRef.afterClosed()
      .subscribe((response: ConfirmDialogData) => {
        this.onDeleteModalClosed(response);
      });
  }

  sendResponse(response: boolean): void {
    this.deleteObj.isConfirmed = response;
    this.deleteDialogRef.close(this.deleteObj);
  }

  onDeleteModalClosed(response: ConfirmDialogData): void {
    if (response && response.isConfirmed)
      this.delete(response.id);
  }

  delete(id: string): void {
    this.spinner.show();
    this._attendanceService.delete(id)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Serviço excluída com sucesso.', 'info');
        this.getServicesType();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao excluir serviço.', 'error')
      });
  }

}
