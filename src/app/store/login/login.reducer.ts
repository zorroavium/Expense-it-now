import { Action, createReducer, on } from '@ngrx/store';

import { initializeLoginState, LoginState } from './login.state';
import * as LoginActions from './login.action';
import { StorageUtil, StorageType, StorageKeys } from 'app/shared';

export const intialLoginState = initializeLoginState();

const reducer = createReducer(intialLoginState,
  on (LoginActions.login, (state: LoginState) => {
    return { ...state};
  }),
  on (LoginActions.loginSuccess, (state: LoginState, action) => {

    StorageUtil.setAttribute(StorageType.SESSION, StorageKeys.LOGGED_IN_USER, (action.payload as string).toUpperCase());

    return { ...state, user: action.payload, error: null };
  }),
  on (LoginActions.loginFailed, (state: LoginState) => {
    return { ...state, error: true };
  })
);

export function LoginReducer(state: LoginState | undefined, action: Action): LoginState {
  return reducer(state, action);
}
