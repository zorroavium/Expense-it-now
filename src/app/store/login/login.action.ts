import { createAction, props } from '@ngrx/store';
import { LoginRequest } from 'app/modules/login/components';

export const login = createAction(
  '[Login] - Login',
  props<{ loginCredentials: LoginRequest }>()
  );

export const loginSuccess = createAction(
  '[Login] - Login Success',
  props<{ payload: any }>()
);

export const loginFailed = createAction(
  '[Login] - Login Failed',
  props<{ error: any }>()
);
