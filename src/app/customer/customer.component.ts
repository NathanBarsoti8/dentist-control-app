import { NotificationService } from './../shared/notification/notification.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Pager } from './../shared/models/paginated-items.model';
import { Customer } from './models/customer.model';
import { CustomerService } from './customer.service';
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalConfirmDialogComponent } from './modal-confirm-dialog/modal-confirm-dialog.component';
import { ConfirmDialogData } from './models/confirm-dialog.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns = ['name', 'cpf', 'birthDate', 'status', 'action'];
  customers: Array<Customer>;
  pager: Pager;
  onlyActives: boolean = true;
  confirmDialogRef: MatDialogRef<ModalConfirmDialogComponent>;

  @ViewChild('search', { static: false }) search: ElementRef;
  // @ViewChild('confirmModal', { static: true }) confirmDialogTemplate: TemplateRef<any>;

  constructor(private _customerService: CustomerService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.getCustomers(x.page || 1, true, ''))
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.getCustomers(this.pager.startPage, this.onlyActives, this.search.nativeElement.value)
    })
  }

  getCustomers(page: number, status: boolean, search?: string): void {
    this.spinner.show();
    this._customerService.getAll(page, status, search)
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
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os clientes.', 'error');
      });
  }

  searchCustomers(): void {
    this.getCustomers(this.pager.startPage, this.onlyActives, this.search.nativeElement.value)
  }

  toggleStatus(): void {
    if (this.onlyActives)
      this.onlyActives = false;
    else
      this.onlyActives = true;

    this.getCustomers(this.pager.startPage, this.onlyActives, '');
  }

  changeStatusCustomer(id: string): void {
    this._customerService.changeStatus(id)
      .subscribe(() => this.getCustomers(this.pager.currentPage, this.onlyActives, ''));
  }

  confirmDialog(customerId: string): void {
    this.confirmDialogRef = this.matDialog.open(ModalConfirmDialogComponent, {
      width: '500px',
      height: '210px',
      data: {
        id: customerId
      }
    });

    this.confirmDialogRef.afterClosed()
      .subscribe((response: ConfirmDialogData) => {
        this.onDisableAdmissionModalClosed(response);
      });
  }

  onDisableAdmissionModalClosed(response: ConfirmDialogData): void {
    if (response.isConfirmed)
      this.changeStatusCustomer(response.id);
  }




}