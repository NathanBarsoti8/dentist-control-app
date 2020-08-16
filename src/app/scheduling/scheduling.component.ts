import { Customer } from './../customer/models/customer.model';
import { DateConverterService } from 'app/shared/services/dateConverter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmDialogData } from './../customer/models/confirm-dialog.model';
import { SchedulingDeleteComponent } from './scheduling-delete/scheduling-delete.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NotificationService } from './../shared/notification/notification.service';
import { SchedulingService } from './scheduling.service';
import { Pager } from './../shared/models/paginated-items.model';
import { Scheduling, Status } from './models/scheduling.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent implements OnInit {

  displayedColumns = ['date', 'timeTable', 'customer', 'status', 'action'];
  schedules: Array<Scheduling>;
  pager: Pager;
  deleteDialogRef: MatDialogRef<SchedulingDeleteComponent>;
  formFilter: FormGroup;
  filterStartDate: Date = new Date();
  filterFinishDate: Date = new Date();
  today: Date = new Date();
  customers: Array<Customer>;
  filteredCustomers: Observable<Array<string>> | Array<Customer> | Observable<Array<Customer>>; 

  constructor(private _schedulingService: SchedulingService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private matDialog: MatDialog,
    private dateConverter: DateConverterService,
    private formBuilder: FormBuilder) {
      
    this.formFilter = formBuilder.group({
      inicialDate: [this.filterStartDate],
      finalDate: [this.filterFinishDate],
      customerId: [this.filteredCustomers]
    });
  }

  ngOnInit(): void {
    this.filterStartDate.setDate(this.today.getDate())
    this.filterFinishDate.setDate(this.today.getDate() + 30)

    this.route.queryParams.subscribe(x => this.getSchedules(x.page || 1))
 
    this.getCustomers();
  }

  getSchedules(page: number, customer?: Customer): void {
    let startDate = this.dateConverter.dateFormat(this.filterStartDate);
    let finishDate = this.dateConverter.dateFormat(this.filterFinishDate);
    let customerId = customer != null ? customer.id : ''

    this.spinner.show();
    this._schedulingService.getAll(page, startDate, finishDate, customerId)
      .then(result => {
        if (result) {
          this.pager = result.pager;
          this.schedules = result.data;

          this.schedules.forEach(x => {
            x.date = moment(x.date).format("DD/MM/YYYY");
            if (x.statusId == Status.SCHEDULED)
              x.status = "Agendada";
            else if (x.statusId == Status.DONE)
              x.status = "Concluída";
          });
        }
        else {
          this.schedules = undefined;
        }
        this.spinner.hide();
      }).catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar as consultas.', 'error')
      })
  }

  confirmDialog(scheduleId: string): void {
    this.deleteDialogRef = this.matDialog.open(SchedulingDeleteComponent, {
      width: '500px',
      height: '210px',
      data: {
        id: scheduleId
      }
    });

    this.deleteDialogRef.afterClosed()
      .subscribe((response: ConfirmDialogData) => {
        this.onDeleteModalClosed(response);
      });
  }

  onDeleteModalClosed(response: ConfirmDialogData): void {
    if (response.isConfirmed)
      this.deleteSchedule(response.id);
  }

  deleteSchedule(id: string): void {
    this.spinner.show();
    this._schedulingService.delete(id)
      .then(() => {
        this.spinner.hide();
        this.notification.showNotification('success', 'Consulta excluída com sucesso.', 'info');
        this.getSchedules(1);
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao excluir consulta.', 'error')
      });
  }

  cleanFilter(): void {
    this.formFilter.reset();
  }

  changeInitialDate(date: Date) {
    this.filterStartDate = date;
  }

  changeFinalDate(date: Date) {
    this.filterFinishDate = date;
  }

  getCustomers(): void {
    this.spinner.show();
    this._schedulingService.getCustomers()
      .then(result => {
        if (result) {
          this.customers = result.data;
          this.setFilteredCustomers();
        }
        this.spinner.hide();
      })
      .catch(() => {
        this.spinner.hide();
        this.notification.showNotification('danger', 'Ocorreu um erro ao carregar os clientes.', 'error');
      });
  }

  setFilteredCustomers(): void {
    this.filteredCustomers = this.formFilter.get('customerId').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.customers));
  }

  _filter(name: string): Array<Customer> {
    const filterValue = name.toLowerCase();

    return this.customers.filter(opt => opt.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.name : undefined;
  }

}
