import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgSlimScrollModule, } from 'ngx-slimscroll';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';

import { SHARED_SERVICES } from './shared';
import { effects, reducers } from './store';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppSharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { INTERCEPTED_BACKEND_PROVIDER, JSON_BACKEND_PROVIDER } from './core/providers';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const BACKEND_PROVIDER = environment.connectToBackendServer ?
  INTERCEPTED_BACKEND_PROVIDER : JSON_BACKEND_PROVIDER;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    // StoreModule.forRoot(reducers, { metaReducers }),
    SimpleNotificationsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppSharedModule,
    NgSlimScrollModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [BACKEND_PROVIDER,
    ...SHARED_SERVICES,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
