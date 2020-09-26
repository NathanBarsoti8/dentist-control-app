import { SchedulingDetails, FormDates } from './../models/scheduling.model';
import { DateConverterService } from './../../shared/services/dateConverter.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulingService } from './../scheduling.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Customer } from './../../customer/models/customer.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-scheduling-details',
  templateUrl: './scheduling-details.component.html',
  styleUrls: ['./scheduling-details.component.css']
})
export class SchedulingDetailsComponent implements OnInit {

  schedulingId: string;
  scheduling: SchedulingDetails;
  schedulingDetailsForm: FormGroup;
  serviceTypes: Array<DefaultInterface<number>>;
  validation_messages: FormValidationMessages;
  customers: Array<Customer>;
  filteredCustomers: Observable<Array<string>> | Array<Customer> | Observable<Array<Customer>>; 
  addFormSchedules: FormGroup;
  dialogRef: MatDialogRef<SchedulingDetailsComponent>;
  schedulesToModal: Array<any>;
  dayFrom: string;
  dayTo: string;
  @ViewChild('showSchedules', { static: true }) showSchedules: TemplateRef<this>;
  @ViewChild('formSchedules', { static: true }) formSchedules: TemplateRef<this>;

  constructor(private router: ActivatedRoute,
    private _schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.schedulingId = params.schedulingId;
      this.getDetails(this.schedulingId);
    });
    this.generateForm();
    this.getServiceType();
    this.setValidationMessages();
    this.getCustomers();
    this.generateFormSchedules();
  }

  getDetails(id: string): void {
    this.spinner.show();
    this._schedulingService.getById(id)
      .then(result => {
        if (result) {
          this.scheduling = result[0];
          this.populateForm(this.scheduling);
        }
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os detalhes da consulta.', 'error');
      });
  }

  getServiceType(): void {
    this._schedulingService.getServiceType()
      .then(result => {
        this.serviceTypes = result;
      })
      .catch(() => {
        this.notification.showNotification('danger', 'Ocorreu um erro ao buscar os tipos de serviço.', 'error');
      })
  }

  generateForm(): void {
      this.schedulingDetailsForm = this.formBuilder.group({
        date: ['', [Validators.required]],
        timeTable: ['', [Validators.required]],
        customer: [this.filteredCustomers, [Validators.required]],
        serviceTypeId: ['', [Validators.required]]
      });
  }

  populateForm(schedule: SchedulingDetails): void {
    if (schedule) {
      schedule.date = new Date(schedule.date + ' 00:00:00');

      this.schedulingDetailsForm.patchValue(schedule);
      this.schedulingDetailsForm.get('date').setValue(schedule.date);
      this.schedulingDetailsForm.get('timeTable').setValue(schedule.timeTable);
      this.schedulingDetailsForm.get('customer').setValue(schedule.customerName);
      this.schedulingDetailsForm.get('serviceTypeId').setValue(schedule.serviceTypeId);
    }
    return;
  }

  setValidationMessages(): void {
    this.validation_messages = {
      generic: [
        { type: 'required', message: 'Campo obrigatório' }
      ]
    }
  }

  update(obj: any): void {
    this.spinner.show();

    if (typeof obj.customer == 'string') {
      obj.customerId = this.scheduling.customerId;
      delete obj['customer'];
    }
    else if (typeof obj.customer == 'object') {
      obj.customerId = obj.customer.id;
      delete obj['customer'];
    }

    obj.date = this.dateConverter.dateFormat(obj.date);
    
    this._schedulingService.update(this.schedulingId, obj)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Consulta atualizada com sucesso.', 'info');
      }).catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error');
      })
  }

  getCustomers(): void {
    this.spinner.show();
    this._schedulingService.getCustomers()
      .then(result => {
        if (result) {
          this.customers = result.data;
          this.setFilteredCustomers();
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os clientes.', 'error');
      });
  }

  setFilteredCustomers(): void {
    this.filteredCustomers = this.schedulingDetailsForm.get('customer').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.customers));
  }

  _filter(name: string): Array<Customer> {
    const filterValue = name.toLowerCase();

    return this.customers.filter(opt => opt.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }

  //MODAL SCHEDULES
  generateFormSchedules(): void {
    this.addFormSchedules = this.formBuilder.group({
      inicialDate: [''],
      finalDate: ['']
    })
  }

  openFormSchedulesModal(): void {
    this.dialogRef = this.dialog.open(this.formSchedules, {
      width: '45%',
      height: '35%',
      panelClass: 'plans-form-dialog'
    })
  }

  openSchedulesModal(): void {
    this.dialogRef = this.dialog.open(this.showSchedules, {
      width: '500px',
      panelClass: 'plans-form-dialog'
    });
  }

  cleanFilter(): void {
    this.addFormSchedules.reset();
  }

  renderModalTitle(): string {
    return `Consultas do dia ${this.dayFrom} ao dia ${this.dayTo}`;
  }

  getSchedulesToModal(dates: FormDates): void {
    dates.inicialDate = this.dateConverter.dateFormat(dates.inicialDate);
    dates.finalDate = this.dateConverter.dateFormat(dates.finalDate);

    this.dayFrom = this.dateConverter.toLocaleString(dates.inicialDate);
    this.dayTo = this.dateConverter.toLocaleString(dates.finalDate);

    this.spinner.show();
    this._schedulingService.getByPeriod(dates.inicialDate, dates.finalDate)
      .then(result => {
        if (result) {
          this.schedulesToModal = result.schedules;

          this.schedulesToModal.forEach(x => {
            x.date = moment(x.date).format("DD/MM/YYYY");
          })

          this.openSchedulesModal();
          this.spinner.hide();
        }
        else {
          this.schedulesToModal = undefined;
          this.openSchedulesModal();
          this.spinner.hide();
        }
      })
      .catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error');
      });
  }

}
