import { ISlimScrollOptions, NgSlimScrollModule, SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from '../material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { SliderSidebarComponent } from './components/slider-sidebar';
import { SHARED_COMPONENTS } from './components';
import { AgGridModule } from 'ag-grid-angular';
import { CustomTooltipComponent } from './components/expense-grid/cell-renderer/custom-tooltip.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgSlimScrollModule,
        MatTabsModule,
        MaterialModule,
        NgSlimScrollModule,
        NgApexchartsModule,
        AgGridModule.withComponents([
          CustomTooltipComponent
        ])
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgSlimScrollModule,
        MatTabsModule,
        MaterialModule,
        NgSlimScrollModule,
        NgApexchartsModule,
        SliderSidebarComponent,
        ...SHARED_COMPONENTS
    ],
    declarations: [
      SliderSidebarComponent,
      ...SHARED_COMPONENTS
    ],
    providers: [
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: false
      } as ISlimScrollOptions
    },
    AuthGuard
    ]
})
export class AppSharedModule { }
