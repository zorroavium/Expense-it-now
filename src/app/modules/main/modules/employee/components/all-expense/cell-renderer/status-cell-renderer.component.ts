import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 're-status-cell-renderer',
  template: `<div>
                <mat-horizontal-stepper id="mat-stepper" class="stepper" labelPosition="bottom" style="width: 265px;" #stepper>

                  <ng-template matStepperIcon="checkicon">
                    <mat-icon>check</mat-icon>
                  </ng-template>

                  <ng-template matStepperIcon="highlightofficon">
                    <mat-icon>highlight_off</mat-icon>
                  </ng-template>


                  <ng-template matStepperIcon="schedule">
                    <mat-icon>schedule</mat-icon>
                  </ng-template>

                  <ng-container *ngFor="let row of params">
                      <mat-step [label]="row?.name" [state]="row?.icon" [completed]="row?.approved" editable="false">
                      </mat-step>
                  </ng-container>

                </mat-horizontal-stepper>

  </div>`,
 styles: [
   `.steeper {
      width: 265px;
      height: 40px;
    }

    ::ng-deep .mat-stepper-label-position-bottom .mat-horizontal-stepper-header {
      padding: 2px !important;
    }

    ::ng-deep .mat-stepper-label-position-bottom .mat-horizontal-stepper-header {
      top: 0px !important;
    }

    ::ng-deep .mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label {
      padding: 0px !important;
      font-size: 11px;
    }

    ::ng-deep .mat-stepper-label-position-bottom .mat-stepper-horizontal-line {
      top: 16px !important;
    }

    ::ng-deep .mat-horizontal-stepper-header{
       pointer-events: none !important;
    }

    ::ng-deep .mat-step-icon {
      height: 20px !important;
      width: 20px !important;
    }


 `],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StatusCellRendererComponent implements ITooltipAngularComp {

  public params = [];

  agInit(params): void {

    this.params = params.value;

  }
}
