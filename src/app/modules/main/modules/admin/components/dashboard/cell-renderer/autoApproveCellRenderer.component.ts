import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 're-tooltip-component',
  template: `
            <i class="fa fa-times text-danger" *ngIf="!params.value"></i>
            <i class="fa fa-check text-success" *ngIf="params.value"></i>
            `,
 styles: [
    `
    `
  ],
})
export class AutoApproveCellRendererComponent implements ITooltipAngularComp {
  public params: any;

  agInit(params): void {

    this.params = params;
    console.log('AutoApproveCellRendererComponent', params.value);
  }
}
