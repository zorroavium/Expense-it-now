export * from './login';

import * as LoginComponents from './';

export const LOGIN_COMPONENTS = [
  LoginComponents.LoginComponent,
];

export interface LoginRequest {
  email: string;
  password: string;
}
