import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Array<Customer>;

  constructor(private _customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers() {
    this._customerService.getAll()
      .then(result => {

        console.log('customers', result)

        if (result) {
          this.customers = result;
        }
      }).catch(() => {

      });
  }

}
