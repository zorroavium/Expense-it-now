import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Moment from 'moment';

import { EmployeeState } from '../../store/employee';
import { AppState, getEmployeeState} from 'app/store';
import * as EmployeeAction from '../../store/employee';
import { MatTabChangeEvent } from '@angular/material/tabs';

const TABS = [
  {id: 1, tabName: 'Your Expenses', icon: 'fa fa-hourglass-end'},
  {id: 2, tabName: 'Needs Approval', icon: 'fa fa-list-ul'}
]
@Component({
  selector: 're-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  @ViewChild('createExpensetemplate', {read: TemplateRef, static: true})
  private createExpenseTemplete: TemplateRef<any>;

  public tabs = TABS;
  public activeTabId = 0;
  public modalRef: BsModalRef;
  public employeeState$: Observable<EmployeeState>;
  public editExpense = null;
  public fyYearPicker = this.getFyYear(Moment().format('YYYY'));

  constructor(private router: Router, private modalService: BsModalService, private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.dispatch(EmployeeAction.LoadYoursExpenses(null));

    this.employeeState$ = this.store.pipe(select(getEmployeeState));
  }

  addExpense(): void {
    this.router.navigate(['/main/employee/create-expense']);
  }

  openModalWithClass(template: TemplateRef<any>): void {
    this.editExpense = null;

    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg', keyboard: false,  backdrop : 'static' });

  }

  editExpenseHandler(rowData): void {
   this.editExpense = rowData;
   setTimeout(() =>
   this.modalRef = this.modalService.show(this.createExpenseTemplete,
    { class: 'gray modal-lg', keyboard: false,  backdrop : 'static' }), 0);
  }

  tabClick(event: MatTabChangeEvent): void {
   this.activeTabId = event.index;
  }

  onOpenCalendar(container): void {
    container.yearSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };

    container.setViewMode('year');
  }

  changeYear(date): void {
    if (date) {
     this.fyYearPicker = this.getFyYear(date.getFullYear());
    }
  }

  private getFyYear(value): string {
    return `${Moment(value, 'YYYY').subtract(1, 'years').format('YYYY')} - ${Moment(value, 'YYYY').format('YY')}`;
  }
}
