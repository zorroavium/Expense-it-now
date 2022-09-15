import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin.routing';
import { AppSharedModule } from 'app/shared/shared.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ExpenseByMonthComponent } from './components/expense-by-month/expense-by-month.component';
import { ExpenseSnapshotComponent } from './components/expense-snapshot/expense-snapshot.component';
import { ExpenseCategoriesComponent } from './components/expense-categories/expense-categories.component';
import { ExpensePieChartComponent } from './components/expense-pie-chart/expense-pie-chart.component';
import { ExpenseScreenComponent } from './components/expense-screen/expense-screen.component';
import { ApprovalScreenComponent } from './components/approval-screen/approval-screen.component';
import { ExpenseCategorySettingsComponent } from './components/expense-category-settings/expense-category-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AutoApproveCellRendererComponent } from './components/dashboard/cell-renderer/autoApproveCellRenderer.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    ExpenseCategoriesComponent,
    ExpenseSnapshotComponent,
    ExpenseByMonthComponent,
    ExpensePieChartComponent,
    ExpenseScreenComponent,
    ApprovalScreenComponent,
    ExpenseCategorySettingsComponent,
    DashboardComponent,
    AutoApproveCellRendererComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppSharedModule,
    ModalModule.forRoot(),
    AgGridModule.withComponents([
      AutoApproveCellRendererComponent
    ]),
  ],
  providers: [

  ]
})
export class AdminModule { }
