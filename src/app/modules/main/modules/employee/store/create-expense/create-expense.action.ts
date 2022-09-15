import { createAction, props } from '@ngrx/store';

export const CreateExpense = createAction(
  '[CreateExpense] - CreateExpense',
  props<{ payload: any }>()
  );

export const CreateExpenseSuccess = createAction(
  '[CreateExpense] - CreateExpense Success',
  props<{ payload: any }>()
);

export const CreateExpenseFailed = createAction(
  '[CreateExpense] - CreateExpense Failed',
  props<{ error: any }>()
);
