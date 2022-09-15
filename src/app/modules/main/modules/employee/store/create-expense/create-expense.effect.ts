import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { EmployeeService } from 'app/shared/services/employee.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as CreateExpenseAction from './create-expense.action';


@Injectable()
export class CreateExpenseEffects {

  constructor(private employeeService: EmployeeService,
              private action$: Actions,
              private notify: NotificationsService) {}

  Login$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(CreateExpenseAction.CreateExpense),
    mergeMap(action =>
      this.employeeService.createExpense(action.payload).pipe(
        map((data: any) => {
          this.notify.success('Create Expense', 'Successfully add new expenses', {animate: 'scale'});
          return CreateExpenseAction.CreateExpenseSuccess({ payload: data });
        }),
        catchError((error: Error) => {
          return of(CreateExpenseAction.CreateExpenseFailed({error}));
        })
       )
     )
   )
 );

}
