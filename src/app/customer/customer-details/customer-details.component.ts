import { FormValidationMessages } from './../../shared/models/validation-messages.model';
import { DefaultInterface } from './../../shared/models/default-interface.model';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerDetails } from '../models/customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private notification: NotificationService) { }

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
      birthDate: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      sex: ['', [Validators.required]],
      isActive: [''],
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

  populateForm(customer: CustomerDetails): void {
    if (customer) {

      customer[0].birthDate = moment(customer[0].birthDate).format("DD/MM/YYYY");

      this.customerDetailsForm.patchValue(customer[0]);
      this.customerDetailsForm.get('name').setValue(customer[0].name);
      this.customerDetailsForm.get('cpf').setValue(customer[0].cpf);
      this.customerDetailsForm.get('birthDate').setValue(customer[0].birthDate);
      this.customerDetailsForm.get('sex').setValue(customer[0].sex);
      this.customerDetailsForm.get('email').setValue(customer[0].email);
      this.customerDetailsForm.get('job').setValue(customer[0].job);
      this.customerDetailsForm.get('isActive').setValue(customer[0].isActive);
      this.customerDetailsForm.get('phoneType').setValue(customer[0].phoneTypeId);
      this.customerDetailsForm.get('ddd').setValue(customer[0].DDD);
      this.customerDetailsForm.get('phoneNumber').setValue(customer[0].phoneNumber);
      this.customerDetailsForm.get('zipCode').setValue(customer[0].zipCode);
      this.customerDetailsForm.get('address').setValue(customer[0].address);
      this.customerDetailsForm.get('addressNumber').setValue(customer[0].addressNumber);
      this.customerDetailsForm.get('neighborhood').setValue(customer[0].neighborhood);
      this.customerDetailsForm.get('complement').setValue(customer[0].complement);
      this.customerDetailsForm.get('city').setValue(customer[0].city);
      this.customerDetailsForm.get('state').setValue(customer[0].state);
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

    //NEED REFACT THAT
    let day = obj.birthDate.slice(0, 2)
    let month = obj.birthDate.slice(2, 4)
    let year = obj.birthDate.slice(4, 8)

    let date = new Date(`${year}-${month}-${day}`)

    obj.birthDate = date;

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
