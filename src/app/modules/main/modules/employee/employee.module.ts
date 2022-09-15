import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AppSharedModule } from 'app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import {QuillModule} from 'ngx-quill';
import { BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap/datepicker';

import { EMPLOYEE_DASHBOARD_COMPONENTS } from './components';
import { ActionCellRendererComponent } from './components/all-expense/cell-renderer/action-cell-renderer.component';
import { StatusCellRendererComponent } from './components/all-expense/cell-renderer/status-cell-renderer.component';
import { EMPLOYEE_ROUTING_MODULE } from './employee.routing';
import { EMPLOYEE_DASHBOARD_LAYOUTS } from './layouts';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    EMPLOYEE_ROUTING_MODULE,
    AgGridModule.withComponents([
      StatusCellRendererComponent,
      ActionCellRendererComponent
    ]),
    AppSharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: []
      }
    })
  ],
  declarations: [
    ...EMPLOYEE_DASHBOARD_LAYOUTS,
    ...EMPLOYEE_DASHBOARD_COMPONENTS
  ]
})
export class EmployeeModule {}
