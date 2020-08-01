import { SchedulingDetails } from './../models/scheduling.model';
import { DateConverterService } from './../../shared/services/dateConverter.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SchedulingService } from './../scheduling.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduling-create',
  templateUrl: './scheduling-create.component.html',
  styleUrls: ['./scheduling-create.component.css']
})
export class SchedulingCreateComponent implements OnInit {

  serviceTypes: Array<DefaultInterface<number>>;
  addSchedulingForm: FormGroup;
  validation_messages: FormValidationMessages;

  constructor(private _schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService) { }

  ngOnInit(): void {
    this.generateForm();
    this.getServiceType();
    this.setValidationMessages();
  }

  generateForm(): void {
    this.addSchedulingForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      timeTable: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      status: ['', [Validators.required]]
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

  createScheduling(scheduling: SchedulingDetails) {
    this.spinner.show();
    scheduling.date = this.dateConverter.formatStringManually(scheduling.date);

    this._schedulingService.create(scheduling)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Cliente adicionado com sucesso.', 'info');
        this.router.navigate([`/scheduling`]);
      })
      .catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error');
      })
  }

}
