import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppSharedModule } from 'src/app/shared/shared.module';
import { MainRoutingModule } from './main.routing';


@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    MainRoutingModule,
    AppSharedModule,
    QuillModule.forRoot()
  ]
})
export class MainModule { }
