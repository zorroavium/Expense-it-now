import { createAction, props } from '@ngrx/store';

export const GetExpense = createAction(
  '[Dashboard] - GetExpense',
  );

export const GetExpenseSuccess = createAction(
  '[Dashboard] - GetExpense Success',
  props<{ payload: any }>()
);

export const GetExpenseFailed = createAction(
  '[Dashboard] - GetExpense Failed',
  props<{ error: any }>()
);

export const UpdateTabSelection = createAction(
  '[CreateExpense] - UpdateTabSelection',
  props<{ payload: number }>()
  );
