import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { PaginatedItems } from 'app/shared/models/paginated-items.model';
import { MatPaginator } from '@angular/material/paginator';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns = ['name', 'cpf', 'birthDate', 'status'];
  customers: Array<Customer>;
  loading: boolean = false;
  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild('search', { static: false }) search: ElementRef;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(private _customerService: CustomerService,
      private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers(this.pageSize, this.pageIndex)
  }

  // ngAfterViewInit(): void {
  //   fromEvent(this.search.nativeElement, 'keyup').pipe(
  //     debounceTime(250),
  //     distinctUntilChanged()
  //   ).subscribe(() => {
  //     this.refreshTable();
  //   });

  //   this.paginator.page.pipe(
  //     tap(() => {
  //       this.refreshTable();
  //     })
  //   ).subscribe();
  // }

  getCustomers(pageSize: number, pageIndex: number, search?: string): void {
    this.loading = true;
    this._customerService.getAll()
      .then(result => {
        if (result) {

          result.forEach(x => {
            x.birthDate = moment(x.birthDate).format("DD/MM/YYYY");
          });

          this.customers = result;
        }
        this.loading = false;
      }).catch(() => {
        this.toastr.error('Ocorreu um erro ao carregar os clientes.');
        this.loading = false;
      });
  }

  // searchCustomers(): void {
  //   this.getCustomers(this.paginator.pageSize, this.paginator.pageIndex, this.search.nativeElement.value);
  //   this.paginator.page.pipe(
  //     tap(() => {
  //       this.getCustomers(this.paginator.pageSize, this.paginator.pageIndex, this.search.nativeElement.value);
  //     })
  //   ).subscribe();
  //   this.paginator.pageIndex = 0;
  // }

  // refreshTable(): void {
  //   this.getCustomers(this.paginator.pageSize, this.paginator.pageIndex, this.search.nativeElement.value);
  // }

}
