import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerDetailsComponent } from './../../customer/customer-details/customer-details.component';
import { CustomerComponent } from './../../customer/customer.component';
import { CustomerCreateComponent } from 'app/customer/customer-create/customer-create.component';
import { SchedulingComponent } from 'app/scheduling/scheduling.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from "ngx-mask";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmDialogComponent } from 'app/customer/modal-confirm-dialog/modal-confirm-dialog.component';
import { SchedulingDetailsComponent } from './../../scheduling/scheduling-details/scheduling-details.component';
import { SchedulingCreateComponent } from 'app/scheduling/scheduling-create/scheduling-create.component';
import { SchedulingDeleteComponent } from './../../scheduling/scheduling-delete/scheduling-delete.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    SharedModule.forRoot(),
    NgxSpinnerModule,
    MatToolbarModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    CustomerCreateComponent,
    ModalConfirmDialogComponent,
    SchedulingComponent,
    SchedulingDetailsComponent,
    SchedulingCreateComponent,
    SchedulingDeleteComponent
  ]
})

export class AdminLayoutModule { }
