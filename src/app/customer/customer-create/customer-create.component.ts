import { CustomerDetails } from './../models/customer.model';
import { NotificationService } from './../../shared/notification/notification.service';
import { DefaultInterface } from 'app/shared/models/default-interface.model';
import { FormValidationMessages } from '../../shared/models/validation-messages.model';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from 'app/shared/custom/cpf-validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { DateConverterService } from 'app/shared/services/dateConverter.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  genders = [
    { value: "M", option: "Masculino" },
    { value: "F", option: "Feminino" }
  ];

  phoneTypes: Array<DefaultInterface<number>>;
  addCustomerForm: FormGroup;
  public validation_messages: FormValidationMessages;

  constructor(private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService) { }

  ngOnInit(): void {
    this.generateForm();
    this.getPhoneType();
    this.setValidationMessages();
  }

  generateForm(): void {
    this.addCustomerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), CpfValidator.validate]],
      birthDate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      sex: ['', [Validators.required]],
      email: [''],
      job: ['', [Validators.required]],
      phoneType: ['', [Validators.required]],
      ddd: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      zipCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      addressNumber: [''],
      neighborhood: ['', [Validators.required]],
      complement: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  setValidationMessages(): void {
    this.validation_messages = {
      generic: [
        { type: 'required', message: 'Campo obrigatório' }
      ],
    }
  }

  getPhoneType(): void {
    this._customerService.getPhoneType()
      .then(result => {
        this.phoneTypes = result;
      })
      .catch(() => {
        this.notification.showNotification('danger', 'Ocorreu um erro ao buscar os tipos de telefone.', 'error');
      });
  }

  createCustomer(customer: CustomerDetails): void {
    this.spinner.show();
    customer.birthDate = this.dateConverter.convertStringToDate(customer.birthDate);

    this._customerService.create(customer)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Cliente adicionado com sucesso.', 'info');
        this.router.navigate([`/customer`]);
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao adicionar novo cliente.', 'error');
      })
  }

}

