import { Action, createReducer, on } from '@ngrx/store';

import * as DashboardActions from './dashboard.action';
import { DashboardState, initializeDashboardState } from './dashboard.state';

export const intialDashboardState = initializeDashboardState();

const reducer = createReducer(intialDashboardState,
  on (DashboardActions.GetExpense, (state: DashboardState) => {
    return { ...state};
  }),
  on (DashboardActions.GetExpenseSuccess, (state: DashboardState, action) => {
    console.log('GetExpenseSuccess', action);
    return { ...state, expense: action.payload, error: null };
  }),
  on (DashboardActions.GetExpenseFailed, (state: DashboardState) => {
    return { ...state, error: true };
  }),
  on (DashboardActions.UpdateTabSelection, (state: DashboardState, action) => {
    return { ...state, selectedIndex: action.payload};
  })
);

export function DashboardReducer(state: DashboardState | undefined, action: Action): DashboardState {
  return reducer(state, action);
}
