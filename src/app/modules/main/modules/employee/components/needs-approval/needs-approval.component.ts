import { Component, OnInit } from '@angular/core';

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
  selector: 're-needs-approval',
  templateUrl: './needs-approval.component.html',
  styleUrls: ['./needs-approval.component.scss']
})
export class NeedsApprovalComponent implements OnInit {


  public columnDefs = [
    { headerName: 'Category',        field: 'category', editable: (params) => !params.data.last_update_on },
    { headerName: 'Expense Date',    field: 'expense_date'},
    { headerName: 'Employee Code',   field: 'employee_code' },
    { headerName: 'Employee Name',   field: 'employee_name', width: 'auto' },
    { headerName: 'Description',     field: 'description', width: 'auto' },
    { headerName: 'Attachments',     field: 'attachments', cellRenderer: attachmentCellRenderer },
    { headerName: 'Expense Amount',  field: 'amount' },
    { headerName: 'Approved amount', field: 'approved_amt', width: 200, editable: (params) => !params.data.last_update_on },
    { headerName: 'Status',          field: 'expense_status',  editable: true, cellEditor: 'agRichSelectCellEditor',
    cellEditorParams: {
      cellHeight: 30,
      values: ['', 'Approved', 'Rejected'],
    },
      cellClassRules: {
        ' alert-danger': (params) => params && params.value === status.Rejected,
        ' alert-warning': (params) => params && params.value === status.Pending,
        ' alert-success': (params) => params && params.value === status.Approved
      }, },
    { headerName: 'Last Updated On', field: 'last_update_on' },
  ];

  public defaultColDef = {
     // set the default column width
     width: 150,
     // make every column use 'text' filter by default
     filter: true,
     // enable floating filters by default
     floatingFilter: true,
     // make columns resizable
     resizable: true,
  };

  public gridOptions = {
   // rowHeight: 30,
  };

  public rowData = [
    { expense_status: 'Pending',   category: 'Laptop',  expense_date: '23/03/2021', employee_code: '1111-0001', employee_name: 'Sachin Tendulkar', description: 'sample description', amount: 2000, last_update_on: '01/04/2021', approved_amt: 1200, attachments: 'file with long name 1, file 2'},
    { expense_status: 'Pending',    category: 'Travel',  expense_date: '31/03/2021', employee_code: '1111-0002', employee_name: 'Akshay Kumar',     description: 'sample description', amount: 2000, last_update_on: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
    { expense_status: 'Pending',    category: 'Charger', expense_date: '16/04/2021', employee_code: '1111-0003', employee_name: 'Salman Khan',      description: 'sample description', amount: 2000, last_update_on: '',           approved_amt: 1200, attachments: 'file 1, file 2'},
    { expense_status: 'Pending',   category: 'Food',    expense_date: '22/05/2021', employee_code: '1111-0004', employee_name: 'Priyanka Chopra',  description: 'sample description', amount: 2000, last_update_on: '04/05/2021', approved_amt: 1200, attachments: 'file 1, file 2'}
  ];

  ngOnInit(): void {
  }

}
