import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from '../models/customer.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId: string;
  loading: boolean = false;
  customer: CustomerDetails;
  customerDetailsForm: FormGroup;

  constructor(private router: ActivatedRoute,
    private _customerService: CustomerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.customerId = params.customerId;
      this.getDetails(this.customerId);
    });
    this.generateForm();
  }

  generateForm(): void {
    this.customerDetailsForm = this.formBuilder.group({
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

  populateForm(customer: CustomerDetails): void {
    if (customer) {

      customer[0].BirthDate = moment(customer[0].BirthDate).format("DD/MM/YYYY");

      this.customerDetailsForm.patchValue(customer[0]);
      this.customerDetailsForm.get('name').setValue(customer[0].name);
      this.customerDetailsForm.get('cpf').setValue(customer[0].cpf);
      this.customerDetailsForm.get('birthDate').setValue(customer[0].birthDate);
      this.customerDetailsForm.get('sex').setValue(customer[0].sex);
      this.customerDetailsForm.get('email').setValue(customer[0].email);
      this.customerDetailsForm.get('job').setValue(customer[0].job);
      this.customerDetailsForm.get('isActive').setValue(customer[0].isActive);
      this.customerDetailsForm.get('phoneType').setValue(customer[0].phoneType);
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
    this.loading = true;
    this._customerService.getById(id)
    .then(result => {
      if (result) {
        this.customer = result
        this.populateForm(this.customer);
      }
      this.loading = false;
    }).catch(() => {
      this.toastr.error('Ocorreu um erro ao carregar os detalhes do cliente.');
      this.loading = false;
    });
  }

}
