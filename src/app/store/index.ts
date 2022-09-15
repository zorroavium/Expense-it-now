import { ActionReducerMap } from '@ngrx/store';

import * as Login from './login';
import { LoginState } from './login';
import { DashboardState } from './main/admin/dashboard';
import * as Dashboard from '../store/main/admin/dashboard';
import * as CreateExpense from '../modules/main/modules/employee/store/create-expense';
import * as Employee from '../modules/main/modules/employee/store/employee';

export interface ApiResourceState {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export interface AppState {
  login: LoginState;
  createExpense: CreateExpense.CreateExpenseState;
  dashboard: DashboardState;
  employee: Employee.EmployeeState;
}

export const reducers: ActionReducerMap<AppState> = {
  login: Login.LoginReducer,
  createExpense: CreateExpense.CreateExpenseReducer,
  dashboard: Dashboard.DashboardReducer,
  employee: Employee.EmployeeReducer
};

export const effects = [
  Login.LoginEffects,
  CreateExpense.CreateExpenseEffects,
  Dashboard.DashboardEffects,
  Employee.EmployeeEffects
];

// selectors
export const getLoginState = (state: AppState) => state.login;
export const getDashboardState = (state: AppState) => state.dashboard;
export const getEmployeeState = (state: AppState) => state.employee;



