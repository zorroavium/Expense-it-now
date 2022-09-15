import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LoginService } from 'app/shared/services/login.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as LoginAction from './login.action';


@Injectable()
export class LoginEffects {

  constructor(private loginService: LoginService,
              private action$: Actions,
              private router: Router) {}

  Login$: Observable<Action> = createEffect(() =>
  this.action$.pipe(
    ofType(LoginAction.login),
    mergeMap(action =>
      this.loginService.login(action.loginCredentials).pipe(
        map((data: any) => {

          if (action.loginCredentials.email === 'admin@email.com') {
            this.router.navigate(['/main/admin']);
            return LoginAction.loginSuccess({ payload: 'admin' });
          }

          if (action.loginCredentials.email === 'employee@email.com') {
            this.router.navigate(['/main/employee/dashboard']);
            return LoginAction.loginSuccess({ payload: 'employee' });
          }

          return LoginAction.loginFailed({ error: new Error('Authentication Error')});
        }),
        catchError((error: Error) => {
          return of(LoginAction.loginFailed({error}));
        })
       )
     )
   )
 );

}
