import { ApiResourceState } from '..';

export interface LoginState extends ApiResourceState {
  user: {};
}

const intialLoginState = { loading: false, loaded: false, error: null };

export const initializeLoginState = (): LoginState => {
  return { user: null, ...intialLoginState };
};
