import { Action, createReducer, on } from '@ngrx/store';

import { initializeState, CreateExpenseState } from './create-expense.state';
import * as LoginActions from './create-expense.action';

export const intialLoginState = initializeState();

const reducer = createReducer(intialLoginState,
  on (LoginActions.CreateExpense, (state: CreateExpenseState) => {
    return { ...state};
  })
);

export function CreateExpenseReducer(state: CreateExpenseState | undefined, action: Action): CreateExpenseState {
  return reducer(state, action);
}
