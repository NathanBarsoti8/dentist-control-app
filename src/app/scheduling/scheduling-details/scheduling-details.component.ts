import { SchedulingDetails } from './../models/scheduling.model';
import { DateConverterService } from './../../shared/services/dateConverter.service';
import { NotificationService } from './../../shared/notification/notification.service';
import { FormBuilder } from '@angular/forms';
import { SchedulingService } from './../scheduling.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-scheduling-details',
  templateUrl: './scheduling-details.component.html',
  styleUrls: ['./scheduling-details.component.css']
})
export class SchedulingDetailsComponent implements OnInit {

  schedulingId: string;
  scheduling: SchedulingDetails;
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
    // this.generateForm();
    this.getServiceType();
    // this.setValidationMessages();
  }

  getDetails(id: string): void {
    this.spinner.show();
    this._schedulingService.getById(id)
      .then(result => {
        if (result) {
          this.scheduling = result;
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

}
