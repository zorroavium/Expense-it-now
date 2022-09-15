import { Action, createReducer, on } from '@ngrx/store';

import { initializeState, EmployeeState } from './employee.state';
import * as EmployeeActions from './employee.action';

export const intialLoginState = initializeState();

const reducer = createReducer(intialLoginState,
  on (EmployeeActions.LoadYoursExpenses, (state) => {
    return { ...state};
  }),

  on (EmployeeActions.LoadYoursExpensesSuccess, (state: EmployeeState, { payload }) => {
    return { ...state, allExpenses: payload};
  }),

  on (EmployeeActions.LoadYoursExpensesFailed, (state: EmployeeState, { error }) => {
    return { ...state, allExpenses: []};
  })
);

export function EmployeeReducer(state: EmployeeState | undefined, action: Action) {
  return reducer(state, action);
}
