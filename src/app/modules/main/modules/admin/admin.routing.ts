import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalScreenComponent } from './components/approval-screen/approval-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpenseCategorySettingsComponent } from './components/expense-category-settings/expense-category-settings.component';
import { ExpenseScreenComponent } from './components/expense-screen/expense-screen.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'expense',
        component: ExpenseScreenComponent
      },
      {
        path: 'approval',
        component: ApprovalScreenComponent
      },
      {
        path: 'category',
        component: ExpenseCategorySettingsComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
