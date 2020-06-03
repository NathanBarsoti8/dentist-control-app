import { CustomerDetailsComponent } from './../../customer/customer-details/customer-details.component';
import { CustomerComponent } from './../../customer/customer.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
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
    { path: 'user-profile',      component: UserProfileComponent },
    { path: 'table-list',        component: TableListComponent },
    { path: 'customer',          component: CustomerComponent },
    { path: 'customer-details',  component: CustomerDetailsComponent},
];
