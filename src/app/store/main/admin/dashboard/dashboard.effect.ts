import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as DashboardAction from './dashboard.action';
import { ApiDataService } from 'app/shared/services/api-data.service';
import { API_ENDPOINTS } from 'app/shared';


@Injectable()
export class DashboardEffects {

  constructor(private apiDataService: ApiDataService,
              private action$: Actions
              ) {}

  Login$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(DashboardAction.GetExpense),
    mergeMap(action =>
      this.apiDataService.fetchResource(API_ENDPOINTS.FETCH_EXPENSE, null, true).pipe(
        map((data: any) => {
          const rowData = this.getExpense();
          return DashboardAction.GetExpenseSuccess({ payload: rowData });
        }),
        catchError((error: Error) => {
          return of(DashboardAction.GetExpenseFailed({error}));
        })
       )
     )
   )
 );

 public getExpense(): any {
   return [
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Approved',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', notes: '', description: this.getDescription(null), amount: 2000, approval_date: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
     { expense_status: null,         category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: null,         category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      notes: '', description: 'sample description', amount: 2000, approval_date: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
     { expense_status: 'Rejected',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  notes: '', description: 'sample description', amount: 2000, approval_date: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'},
   ];
 }

 private getDescription(params): string {
  if (params && params.value) {
    return params.value;
  }

  // TODO: For TESTING purposes
  return `<p style="overflow: hidden;text-overflow: ellipsis;"><strong>Sample</strong> <em>email</em> <u>sending</u>
   again for test. Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. <br>
   The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book </p>`;
}

}
