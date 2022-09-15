import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginRequest } from '..';
import { LoginState } from 'app/store/login';
import * as LoginAction from 'app/store/login';
import { AppState, getLoginState } from 'app/store';
import { RegularExpressions } from 'app/shared/constants';

@Component({
  selector: 're-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loginState$: Observable<LoginState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.createLoginForm();

    this.loginState$ = this.store.pipe(select(getLoginState));
  }

  private createLoginForm(): void {
    // Initialize the form group with the email and password form controls
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(RegularExpressions.LOGIN_EMAIL)]),
      password: new FormControl('', [Validators.required, Validators.nullValidator])
    });
  }

  doLogin(): void {

    const loginRequest: LoginRequest = { email: (this.form.get('email').value as string), password: this.form.get('password').value };

    this.store.dispatch(LoginAction.login({ loginCredentials: loginRequest }));
  }

}
