import { SchedulingDetails } from './../models/scheduling.model';
import { DateConverterService } from './../../shared/services/dateConverter.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulingService } from './../scheduling.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private router: ActivatedRoute,
    private _schedulingService: SchedulingService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.schedulingId = params.schedulingId;
      this.getDetails(this.schedulingId);
    });
    this.generateForm();
    this.getServiceType();
    this.setValidationMessages();
  }

  getDetails(id: string): void {
    this.spinner.show();
    this._schedulingService.getById(id)
      .then(result => {
        if (result) {
          this.scheduling = result;
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
        customerName: ['', [Validators.required]],
        serviceType: ['', [Validators.required]]
      });
  }

  populateForm(schedule: SchedulingDetails): void {
    if (schedule) {

      schedule[0].date = moment(schedule[0].date).format("DD/MM/YYYY");

      this.schedulingDetailsForm.patchValue(schedule[0]);
      this.schedulingDetailsForm.get('date').setValue(schedule[0].date);
      this.schedulingDetailsForm.get('timeTable').setValue(schedule[0].timeTable);
      this.schedulingDetailsForm.get('customerName').setValue(schedule[0].customerName);
      this.schedulingDetailsForm.get('serviceType').setValue(schedule[0].serviceTypeId);
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

  update(obj: SchedulingDetails): void {
    this.spinner.show();

    obj.date = this.dateConverter.convertStringToDate(obj.date);

    this._schedulingService.update(this.schedulingId, obj)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Consulta atualizada com sucesso.', 'info');
      }).catch(error => {
        this.spinner.hide();
        this.notification.showNotification('danger', error.error.msg, 'error');
      })
  }



}
