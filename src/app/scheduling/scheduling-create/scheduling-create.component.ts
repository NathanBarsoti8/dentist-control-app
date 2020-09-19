import { SchedulingDetails, Scheduling } from './../models/scheduling.model';
import { DateConverterService } from './../../shared/services/dateConverter.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SchedulingService } from './../scheduling.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Customer } from 'app/customer/models/customer.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-scheduling-create',
  templateUrl: './scheduling-create.component.html',
  styleUrls: ['./scheduling-create.component.css']
})
export class SchedulingCreateComponent implements OnInit {

  serviceTypes: Array<DefaultInterface<number>>;
  addSchedulingForm: FormGroup;
  validation_messages: FormValidationMessages;
  customers: Array<Customer>;
  filteredCustomers: Observable<Array<string>> | Array<Customer> | Observable<Array<Customer>>; 
  @ViewChild('showSchedules', { static: true }) showSchedules: TemplateRef<this>;
  dialogRef: MatDialogRef<SchedulingCreateComponent>;
  schedulesToModal: Array<any>;

  constructor(private _schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.generateForm();
    this.getServiceType();
    this.getCustomers();
    this.setValidationMessages();
  }

  generateForm(): void {
    this.addSchedulingForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      timeTable: ['', [Validators.required]],
      customerId: [this.filteredCustomers, [Validators.required]],
      serviceTypeId: ['', [Validators.required]]
    });
  }

  setValidationMessages(): void {
    this.validation_messages = {
      generic: [
        { type: 'required', message: 'Campo obrigatório' }
      ],
    }
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

  createScheduling(scheduling: SchedulingDetails): void {
    this.spinner.show();
    scheduling.date = this.dateConverter.convertStringToDate(scheduling.date);
    scheduling.customerId = scheduling.customerId.id;
    scheduling.timeTable = this.dateConverter.formatHour(scheduling.timeTable);

    this._schedulingService.create(scheduling)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Consulta agendada com sucesso.', 'info');
        this.router.navigate([`/scheduling`]);
      })
      .catch(error => {
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
    this.filteredCustomers = this.addSchedulingForm.get('customerId').valueChanges
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

  openSchedulesModal(): void {
    this.dialogRef = this.dialog.open(this.showSchedules, {
      width: '500px',
      panelClass: 'plans-form-dialog'
    });
  }

  renderModalTitle(): string {

    let date = moment(new Date().setDate(new Date().getDate() + 30)).format('YYYY-MM-DD');
    let dateLess15 = moment(new Date(date).setDate(new Date(date).getDate() - 15)).format('DD/MM/YYYY');
    let dateMore15 = moment(new Date(date).setDate(new Date(date).getDate() + 15)).format('DD/MM/YYYY');

    return `Consultas do dia ${dateLess15} ao dia ${dateMore15}`;
  }

  getSchedulesToModal(): void {
    this.spinner.show();
    this._schedulingService.getByPeriod()
      .then(result => {
        if (result) {
          this.schedulesToModal = result.schedules;
          this.openSchedulesModal();
          this.spinner.hide();
        }
        else {
          this.schedulesToModal = undefined;
          this.openSchedulesModal();
          this.spinner.hide();
        }
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar as consultas.', 'error');
      });
  }


}
