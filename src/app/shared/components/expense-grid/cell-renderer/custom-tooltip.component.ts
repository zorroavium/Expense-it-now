import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 're-tooltip-component',
  template: ` <div class="custom-tooltip" style="position: relative;">
              <div class="card p-1" [innerHTML]="data?.description">
              </div>
             </div>`,
 styles: [
    `
      :host {
        position: absolute;
        overflow: visible;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip p {
        margin: 5px;
        white-space: nowrap;
      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
  ],
})
export class CustomTooltipComponent implements ITooltipAngularComp {
  public data: any;

  agInit(params): void {

    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    console.log(this.data);
  }
}