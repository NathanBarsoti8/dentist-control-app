import { FormValidationMessages } from './../shared/models/validation-messages.model';
import { ConfirmDialogData } from './../customer/models/confirm-dialog.model';
import { NotificationService } from 'app/shared/notification/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ServiceType } from './models/attendance.model';
import { AttendanceService } from './attendance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  displayedColumns = ['name', 'action'];
  servicesType: Array<ServiceType>;
  validation_messages: FormValidationMessages;
  addForm: FormGroup;
  deleteObj: ConfirmDialogData = { id: null, isConfirmed: null } as ConfirmDialogData;
  deleteDialogRef: MatDialogRef<AttendanceComponent>;
  createDialogRef: MatDialogRef<AttendanceComponent>;
  isUpdate: boolean = false;
  @ViewChild('deleteServiceType', { static: true}) deleteServiceType: TemplateRef<this>;
  @ViewChild('createServiceType', { static: true }) createServiceType: TemplateRef<this>;

  constructor(private _attendanceService: AttendanceService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getServicesType();
    this.generateFormAttendance();
    this.setValidationMessages();
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

  generateFormAttendance(): void {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  setValidationMessages(): void {
    this.validation_messages = {
      generic: [
        { type: 'required', message: 'Campo obrigatório' }
      ]
    }
  }

  openAddModal(): void {
    this.createDialogRef = this.matDialog.open(this.createServiceType, {
      width: '500px',
      height: '235px'
    });

    this.createDialogRef.afterClosed()
      .subscribe(() => {
        this.addForm.get('name').setValue(null);
      })
  }

  create(value): void {
    this.spinner.show();
    this._attendanceService.create(value)
      .then(() => {
        this.createDialogRef.close();
        this.spinner.hide();
        this.notification.showNotification('success', 'Serviço adicionado com sucesso.', 'info'); 
        this.getServicesType();
      })
      .catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error')
      })
  }

  confirmDialog(serviceId: string): void {
    this.deleteObj.id = serviceId;
    this.deleteDialogRef = this.matDialog.open(this.deleteServiceType, {
      width: '500px',
      height: '250px',
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
        this.notification.showNotification('success', 'Serviço excluído com sucesso.', 'info');
        this.getServicesType();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao excluir serviço.', 'error')
      });
  }

  openUpdateModal(obj: ServiceType): void {
    this.isUpdate = true;
    this.addForm.patchValue(obj);
    this.addForm.get('name').setValue(obj.name);

    this.createDialogRef = this.matDialog.open(this.createServiceType, {
      width: '500px',
      height: '235px',
      data: obj
    });

    this.createDialogRef.afterClosed()
      .subscribe(res => {
        if (res) {
          this.update(obj.id, this.addForm.get('name').value)
        }
        this.addForm.get('name').setValue(null);
        this.isUpdate = false;
      })
  }

  sendUpdate(update: boolean): void {
    if (update)
      this.createDialogRef.close(true);
    else 
      this.createDialogRef.close(false);
  }

  update(id: number, value: string): void {
    let obj = { id: id, name: value } as ServiceType;

    this.spinner.show();
    this._attendanceService.update(obj)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Serviço atualizado com sucesso.', 'info'); 
        this.getServicesType();
      })
      .catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error')
      })
  }

}
