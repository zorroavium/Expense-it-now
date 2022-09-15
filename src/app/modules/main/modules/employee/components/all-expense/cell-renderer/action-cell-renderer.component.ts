
import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 're-action-cell-renderer',
  template: `<div class="h-100 text-center text-primary cursor-pointer" style="font-size: 15px;">
    <i class="fa fa-pencil-square-o" aria-hidden="true" style="cursor: pointer;" (click)="openEditExpense()"></i>
  </div>`,
 styles: []
})
export class ActionCellRendererComponent implements ITooltipAngularComp {

  public params = null;

  agInit(params): void {
    this.params = params;
  }

  openEditExpense(): void {
    this.params.context.componentParent.editExpenseHandler(this.params.data);
  }
}
