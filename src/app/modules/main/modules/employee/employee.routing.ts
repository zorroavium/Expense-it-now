import { Routes, RouterModule } from '@angular/router';
import { CreateExpenseComponent } from './layouts/create-expense';
import { EmployeeDashboardComponent } from './layouts/dashboard-layout';

export const EMPLOYEE_ROUTINGE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: EmployeeDashboardComponent
  },
  {
    path: 'create-expense',
    component: CreateExpenseComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

export const EMPLOYEE_ROUTING_MODULE = RouterModule.forChild(EMPLOYEE_ROUTINGE_ROUTES);
