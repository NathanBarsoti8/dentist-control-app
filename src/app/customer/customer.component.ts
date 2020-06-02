import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns = ['name', 'cpf', 'birthDate', 'status'];
  customers: Array<Customer>;
  loading: boolean = false;

  constructor(private _customerService: CustomerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.loading = true;
    this._customerService.getAll()
      .then(result => {
        if (result) {

          result.forEach(x => {
            x.BirthDate = moment(x.BirthDate).format("DD/MM/YYYY");
          });

          this.customers = result;
        }
        this.loading = false;
      }).catch(() => {
        this.toastr.error('Ocorreu um erro ao carregar os clientes.');
        this.loading = false;
      });
  }

}
