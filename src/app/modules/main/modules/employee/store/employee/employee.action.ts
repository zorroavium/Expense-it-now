import { createAction, props } from '@ngrx/store';

export const LoadYoursExpenses = createAction(
  '[Load Yours Expenses] - Load Yours Expenses',
  props<{ payload: any }>()
  );

export const LoadYoursExpensesSuccess = createAction(
  '[Load Yours Expenses] - Load Yours Expenses Success',
  props<{ payload: any }>()
);

export const LoadYoursExpensesFailed = createAction(
  '[Load Yours Expenses] - Load Yours Expenses Failed',
  props<{ error: any }>()
);
