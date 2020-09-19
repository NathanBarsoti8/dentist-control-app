import { DateConverterService } from './../../shared/services/dateConverter.service';
import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetails } from '../models/customer.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { CpfValidator } from 'app/shared/custom/cpf-validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'app/shared/notification/notification.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  genders = [
    { value: "M", option: "Masculino" },
    { value: "F", option: "Feminino" }
  ];

  customerId: string;
  loading: boolean = false;
  customer: CustomerDetails;
  customerDetailsForm: FormGroup;
  phoneTypes: Array<DefaultInterface<number>>;
  validation_messages: FormValidationMessages;

  constructor(private router: ActivatedRoute,
    private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private dateConverter: DateConverterService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.customerId = params.customerId;
      this.getDetails(this.customerId);
    });
    this.generateForm();
    this.getPhoneType();
    this.setValidationMessages();
  }

  generateForm(): void {
    this.customerDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), CpfValidator.validate]],
      birthDate: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      email: [''],
      job: ['', [Validators.required]],
      phones: this.formBuilder.array([]),
      zipCode: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      address: ['', [Validators.required]],
      addressNumber: ['', [Validators.minLength(3), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      neighborhood: ['', [Validators.required]],
      complement: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }

  get phones(): FormArray {
    return this.customerDetailsForm.get('phones') as FormArray;
  }

  newPhone(): FormGroup {
    return this.formBuilder.group({
      typeId: '', 
      ddd: '',
      phoneNumber: ''
    })
  }

  addPhones(): void {
    this.phones.push(this.newPhone());
  }

  removePhone(i: number): void {
    this.phones.removeAt(i);
  }

  populateForm(customer: CustomerDetails): void {
    if (customer) {

      for (let i = 0; i < customer.phones.length; i++) {
        this.phones.push(this.newPhone());
      }
      
      customer.birthDate = moment(customer.birthDate).format("DD/MM/YYYY");

      this.customerDetailsForm.patchValue(customer);
      this.customerDetailsForm.get('name').setValue(customer.name);
      this.customerDetailsForm.get('cpf').setValue(customer.cpf);
      this.customerDetailsForm.get('birthDate').setValue(customer.birthDate);
      this.customerDetailsForm.get('sex').setValue(customer.sex);
      this.customerDetailsForm.get('email').setValue(customer.email);
      this.customerDetailsForm.get('job').setValue(customer.job);
      this.customerDetailsForm.get('zipCode').setValue(customer.address.zipCode);
      this.customerDetailsForm.get('address').setValue(customer.address.address);
      this.customerDetailsForm.get('addressNumber').setValue(customer.address.addressNumber);
      this.customerDetailsForm.get('neighborhood').setValue(customer.address.neighborhood);
      this.customerDetailsForm.get('complement').setValue(customer.address.complement);
      this.customerDetailsForm.get('city').setValue(customer.address.city);
      this.customerDetailsForm.get('state').setValue(customer.address.state);
    }
    return;
  }

  getDetails(id: string): void {
    this.spinner.show();
    this._customerService.getById(id)
      .then(result => {
        if (result) {
          this.customer = result
          this.populateForm(this.customer);
        }
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os detalhes do cliente.', 'error');
      });
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

  setValidationMessages(): void {
    this.validation_messages = {
      generic: [
        { type: 'required', message: 'Campo obrigatório' }
      ],
    }
  }

  update(obj: CustomerDetails): void {
    this.spinner.show();
    obj.birthDate = this.dateConverter.convertStringToDate(obj.birthDate);

    this._customerService.update(this.customerId, obj)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Dados do cliente atualizado com sucesso.', 'info');
      }).catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao atualizar dados do cliente.', 'error');
      })
  }

}
