import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionCellRendererComponent } from './cell-renderer/action-cell-renderer.component';
import { StatusCellRendererComponent } from './cell-renderer/status-cell-renderer.component';

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
  selector: 're-all-expense',
  templateUrl: './all-expense.component.html',
  styleUrls: ['./all-expense.component.scss']
})
export class AllExpenseComponent implements OnInit {

  @Input()
  public rowData = [];

  @Output()
  public editExpense = new EventEmitter();

  public frameworkComponents = {
    statusCellrenderer: StatusCellRendererComponent,
    actionCellrenderer: ActionCellRendererComponent
  };

  public columnDefs = [
    {
      headerName: 'Category',
      field: 'category',
      editable: (params) => !params.data.last_update_on
    },
    {
      headerName: 'Expense Date',
      field: 'expense_date',
      editable: (params) => !params.data.last_update_on},
    {
      headerName: 'Description',
      field: 'description',
      width: 'auto',
      editable: (params) => !params.data.last_update_on },
    {
      headerName: 'Attachments',
      field: 'attachments',
      cellRenderer: attachmentCellRenderer,
      editable: (params) => !params.data.last_update_on },
    {
      headerName: 'Expense Amount',
      field: 'amount',
      editable: (params) => !params.data.last_update_on,
      cellStyle: () => {
       return { 'text-align': 'end' };
      }
    },
    {
      headerName: 'Approved amount',
      field: 'approved_amt',
      width: 200,
      editable: false,
      cellStyle: () => {
      return { 'text-align': 'end' };
      }
    },
    {
      headerName: 'Updated On',
      field: 'last_update_on',
      width: 200,
      editable: false
    },
    {
      headerName: 'Status',
      field: 'expense_status',
      width: 350,
      editable: false,
      cellRenderer: 'statusCellrenderer'
    },
    {
      headerName: 'Action',
      width: 100,
      editable: false,
      filter: false,
      cellRenderer: 'actionCellrenderer'
    },
  ];

  public defaultColDef = {
     // set the default column width
     width: 150,
     // make every column use 'text' filter by default
     filter: 'agTextColumnFilter',
     // enable floating filters by default
     floatingFilter: true,
     // make columns resizable
     resizable: true,

  };

  public gridOptions = {
    rowHeight: 50,
    context: { componentParent: this }
  };


  ngOnInit(): void {
  }

  editExpenseHandler(rowData): void {
   this.editExpense.emit(rowData);
  }


}
