import { CustomerService } from './../customer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from '../models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId: string;
  loading: boolean = false;
  customer: CustomerDetails;

  constructor(private router: ActivatedRoute,
    private _customerService: CustomerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.customerId = params.customerId;
    });

  }

  getDetails(): void {
    this.loading = true;
    this._customerService.getById(this.customerId)
    .then(result => {
      if (result) {
        this.customer = result
      }
      this.loading = false;
    }).catch(() => {
      this.toastr.error('Ocorreu um erro ao carregar os detalhes do cliente.');
      this.loading = false;
    });
  }

}
