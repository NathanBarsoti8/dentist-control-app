import { CustomerCreateComponent } from './../../customer/customer-create/customer-create.component';
import { CustomerDetailsComponent } from './../../customer/customer-details/customer-details.component';
import { CustomerComponent } from './../../customer/customer.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }
    { path: 'dashboard',         component: DashboardComponent },
    { path: 'customer',          component: CustomerComponent },
    { path: 'customer-details',  component: CustomerDetailsComponent},
    { path: 'customer-create',   component: CustomerCreateComponent }
];
