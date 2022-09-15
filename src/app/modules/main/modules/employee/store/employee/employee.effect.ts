import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { EmployeeService } from 'app/shared/services/employee.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as EmployeeAction from './employee.action';


@Injectable()
export class EmployeeEffects {

  constructor(private employeeService: EmployeeService,
              private action$: Actions,
              private notify: NotificationsService) {}

  Login$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(EmployeeAction.LoadYoursExpenses),
    mergeMap(action =>
      this.employeeService.getAllExpenses().pipe(
        map((data: any) => {
          return EmployeeAction.LoadYoursExpensesSuccess({ payload: data });
        }),
        catchError((error: Error) => {
          return of(EmployeeAction.LoadYoursExpensesFailed({error}));
        })
       )
     )
   )
 );

}
