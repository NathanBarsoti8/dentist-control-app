import { DefaultInterface } from 'app/shared/models/default-interface.model';
import { FormValidationMessages } from './../models/validation-messages.model';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  phoneTypes: Array<DefaultInterface<number>>;
  addCustomerForm: FormGroup;
  public validation_messages: FormValidationMessages;

  constructor(private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateForm();
    this.getPhoneType();
    this.setValidationMessages();
  }

  generateForm(): void {
    this.addCustomerForm = this.formBuilder.group({
      name: [''],
      cpf: [''],
      birthDate: [''], 
      sex: [''],
      email: [''],
      job: [''],
      phoneType: [''],
      ddd: [''],
      phoneNumber: [''],
      zipCode: [''],
      address: [''],
      addressNumber: [''],
      neighborhood: [''],
      complement: [''],
      city: [''],
      state: ['']
    });
  }

  setValidationMessages(): void {
    this.validation_messages = {
      name: [
        { type: 'required', message: 'Nome é obrigatório' }
      ],
    }
  }

  getPhoneType(): void {
    this._customerService.getPhoneType()
      .then(result => {
        this.phoneTypes = result;
      })
      .catch(() => {
        this.toastr.error('Ocorreu um erro ao buscar os tipos de telefone.');
      });
  }

  createCustomer(customer): void {
    this._customerService.create(customer)
      .then(() => {

          //TO DO
        
          this.toastr.success('Cliente adicionado com sucesso.');
          this.router.navigate([`/customer`]);
        
        
      })
      .catch(() => {
        this.toastr.error('Ocorreu um erro ao salvar novo cliente.')
      })
  }

}
