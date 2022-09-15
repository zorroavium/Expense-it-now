import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login.routing';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LOGIN_COMPONENTS } from './components';
import { AppSharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    LoginLayoutComponent,
    ...LOGIN_COMPONENTS
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AppSharedModule
  ],
  providers: [],
  exports: [...LOGIN_COMPONENTS]
})
export class LoginModule { }
