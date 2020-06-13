import { ToastrService } from 'ngx-toastr';
import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  addCustomerForm: FormGroup;

  constructor(private _customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(): void {
    this.addCustomerForm = this.formBuilder.group({
      name: [''],
      cpf: [''],
      birthDate: [''], 
      sex: [''],
      email: [''],
      job: [''],
      isActive: [''],
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

}
