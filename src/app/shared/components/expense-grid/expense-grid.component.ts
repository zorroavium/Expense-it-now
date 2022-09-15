import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState, getDashboardState } from 'app/store';
import { CustomTooltipComponent } from './cell-renderer/custom-tooltip.component';
import * as DashboardStore from 'src/app/store/main/admin/dashboard';
import { DashboardState } from 'src/app/store/main/admin/dashboard';
import { Observable } from 'rxjs';
import { GridApi } from 'ag-grid-community';

const status = {
  Approved: 'Approved',
  Pending: 'Pending',
  Rejected: 'Rejected',
};

const attachmentCellRenderer = (params) => {
  let url = '';

  params.value.split(',').forEach((value) => {
    url = url + ' <i class="fa fa-paperclip icon" aria-hidden="true"></i>  <a target="_blank" href="https://google.co.in">' + value + '</a> ';
  });

  return url;
};

@Component({
  selector: 're-expense-grid',
  templateUrl: './expense-grid.component.html',
  styleUrls: ['./expense-grid.component.scss']
})
export class ExpenseGridComponent implements OnInit {

  @Input()
  public height = 55;

  @Input()
  public appliedFilter = null;

  public columnDefs = this.getColDef();

  public defaultColDef = {
     // set the default column width
     width: 150,
     // make every column use 'text' filter by default
     filter: 'agTextColumnFilter',
     // enable floating filters by default
     floatingFilter: true,
     // make columns resizable
     resizable: true,

     tooltipComponent: 'customTooltip',
  };

  public frameworkComponents = { customTooltip: CustomTooltipComponent };

  public gridOptions = {
    rowHeight: 30,
  };

  public dashboardState$: Observable<DashboardState>;
  private gridApi: GridApi;

  constructor(private store: Store<AppState>) { }

  ngonchanges(changes: SimpleChanges): void {
    if (changes.appliedFilter) {
      console.log(this.appliedFilter);
    }
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardStore.GetExpense());

    this.dashboardState$ = this.store.pipe(select(getDashboardState));
  }

  onGridReady(params): void {
    this.gridApi = params.api;

    setTimeout(() => {
      this.applyFilter(this.appliedFilter);
    }, 0);
  }

  applyFilter(appliedFilter): void {
    if (this.gridApi && appliedFilter) {
      this.gridApi.setFilterModel(appliedFilter);
    }
  }

  private getColDef(): any {
    return [
      { headerName: 'Employee Code', field: 'employee_code' },
      { headerName: 'Employee Name', field: 'employee_name', width: 'auto' },
      { headerName: 'Category', field: 'category' },
      { headerName: 'Expense Date', field: 'expense_date' },
      { headerName: 'Description', field: 'description', width: 'auto', cellRenderer: params => this.getDescription(params), tooltipField: 'description' },
      { headerName: 'Attachments', field: 'attachments', cellRenderer: attachmentCellRenderer },
      { headerName: 'Expense Amount', field: 'amount', width: 120 },
      { headerName: 'Approved amount', field: 'approved_amt', width: 120 },
      { headerName: 'Updated On', field: 'approval_date' },
      { headerName: 'Notes', field: 'notes'},
      {
        headerName: 'Status', field: 'expense_status',
        // cellEditor: 'agRichSelectCellEditor',
        // cellEditorParams: {
        //   values: ['Approved', 'Rejected'],
        // },
        cellClassRules: {
          ' alert-danger': (params) => params && params.value === status.Rejected,
          ' alert-warning': (params) => params && params.value === status.Pending,
          ' alert-success': (params) => params && params.value === status.Approved
        },
      },
    ];
  }

  private getDescription(params): string {
    if (params && params.value) {
      return params.value;
    }

    // TODO: For TESTING purposes
    return `<p style="overflow: hidden;text-overflow: ellipsis;"><strong>Sample</strong> <em>email</em> <u>sending</u>
     again for test. Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. <br>
     The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book </p>`;
  }

}
