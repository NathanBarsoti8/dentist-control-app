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
      this.customerDetailsForm.get('name').setValue(customer[0].Name);
      this.customerDetailsForm.get('cpf').setValue(customer[0].Cpf);
      this.customerDetailsForm.get('birthDate').setValue(customer[0].BirthDate);
      this.customerDetailsForm.get('sex').setValue(customer[0].Sex);
      this.customerDetailsForm.get('email').setValue(customer[0].Email);
      this.customerDetailsForm.get('job').setValue(customer[0].Job);
      this.customerDetailsForm.get('isActive').setValue(customer[0].IsActive);
      this.customerDetailsForm.get('phoneType').setValue(customer[0].PhoneType);
      this.customerDetailsForm.get('ddd').setValue(customer[0].DDD);
      this.customerDetailsForm.get('phoneNumber').setValue(customer[0].PhoneNumber);
      this.customerDetailsForm.get('zipCode').setValue(customer[0].ZipCode);
      this.customerDetailsForm.get('address').setValue(customer[0].Address);
      this.customerDetailsForm.get('addressNumber').setValue(customer[0].AddressNumber);
      this.customerDetailsForm.get('neighborhood').setValue(customer[0].Neighborhood);
      this.customerDetailsForm.get('complement').setValue(customer[0].Complement);
      this.customerDetailsForm.get('city').setValue(customer[0].City);
      this.customerDetailsForm.get('state').setValue(customer[0].State);
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
