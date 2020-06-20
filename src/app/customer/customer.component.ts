import { Pager } from './../shared/models/paginated-items.model';
import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns = ['name', 'cpf', 'birthDate', 'status'];
  customers: Array<Customer>;
  pager: Pager;

  @ViewChild('search', { static: false }) search: ElementRef;
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private _customerService: CustomerService,
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.getCustomers(x.page || 1))
  }

  getCustomers(page: number): void {
    this.spinner.show();
    this._customerService.getAll(page)
      .then(result => {
        if (result) {
          this.pager = result.pager;
          this.customers = result.data;

          this.customers.forEach(x => {
            x.birthDate = moment(x.birthDate).format("DD/MM/YYYY");
          });
        }
        this.spinner.hide();
      }).catch(() => {
        this.toastr.error('Ocorreu um erro ao carregar os clientes.');
        this.spinner.hide();
      });
  }

  
}
