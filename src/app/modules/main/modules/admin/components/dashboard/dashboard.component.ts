import { Component, OnInit, TemplateRef } from '@angular/core';
import { GridApi } from 'ag-grid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AutoApproveCellRendererComponent } from './cell-renderer/autoApproveCellRenderer.component';

const CATEGORY_LIST = [
 { name: 'Travel Expense', icon: 'fa fa-plane', color: 'text-primary'},
 { name: 'Meal and Entertaintment', icon: 'fa fa-cutlery', color: 'text-warning'},
 { name: 'Office Supplies', icon: 'fa fa-headphones', color: 'text-pink'},
 { name: 'Parking', icon: 'fa fa-car', color: 'text-red'},
 { name: 'Stationary', icon: 'fa fa-list-alt', color: 'text-pink'},
 { name: 'Medical', icon: 'fa fa-medkit', color: 'text-red'},
 { name: 'Training', icon: 'fa fa-book', color: 'text-primary'},
 { name: 'Other Expense', icon: 'fa fa-pencil', color: ''}
];

@Component({
  selector: 're-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public showLimitGrid = false;
  public showExpense = false;
  public showApproval = false;
  public categoryList = CATEGORY_LIST;
  public deptList = ['QA', 'Sales', 'Development', 'HR', 'Management', 'Manager'];

  private gridApi: GridApi;

  public limitObj = this.intialStateLimitObj();

  public icons = [
    { icon: 'fa fa-plane' },
    { icon: 'fa fa-cutlery' },
    { icon: 'fa fa-headphones' },
    { icon: 'fa fa-car' },
    { icon: 'fa fa-list-alt' },
    { icon: 'fa fa-pencil' },
  ];

  public columnDefs = [
    { headerName: 'Expense',                        field: 'expense', width: 120},
    { headerName: 'Employee Code',                  field: 'employee_code', width: 125 },
    { headerName: 'Employee Name',                  field: 'employee_name', width: 150 },
    { headerName: 'Monthly Limit',                  field: 'monthly_limit', width: 110 ,  cellStyle: () => ({ 'text-align': 'end' })},
    { headerName: 'Yearly Limit',                   field: 'yearly_limit' , width: 110 ,  cellStyle: () => ({ 'text-align': 'end' })},
    { headerName: 'Auto Approved (Within Limits)',  field: 'auto_approve',  width: 160 , cellRenderer: 'autoApproveCellRenderer',
                                                                                          cellStyle: () => ({ 'text-align': 'center' }) },
    { headerName: 'Auto Approval Amount',           field: 'auto_approval_limit',  width: 150},
    { headerName: 'Department',                     field: 'department', width: 130 },
    { headerName: 'Reporting Manager',              field: 'reporting_manager', width: 'auto' }
  ];

  public defaultColDef = {
    //  // set the default column width
    //  width: 150,
     // make every column use 'text' filter by default
     filter: 'agTextColumnFilter',
     // enable floating filters by default
     floatingFilter: true,
     // make columns resizable
     resizable: true,
  };

  public gridOptions = {
    rowHeight: 30,
  };

  public rowData = [
    { expense: 'Laptop',                                                              employee_code: '1111-0001', employee_name: 'Sachin Tendulkar',  monthly_limit: 2000,  yearly_limit: 5000,  auto_approve: false, auto_approval_limit: 2500, department: 'Sales',        reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Travel',                                                              employee_code: '1111-0002', employee_name: 'Akshay Kumar',      monthly_limit: 4000,  yearly_limit: 10000, auto_approve: false, auto_approval_limit: 2500, department: 'Development',  reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Charger',                                                             employee_code: '1111-0003', employee_name: 'Salman Khan',       monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: true,  auto_approval_limit: 2500, department: 'QA',           reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Food',                                                                employee_code: '1111-0004', employee_name: 'Priyanka Chopra',   monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: true,  auto_approval_limit: 2500, department: 'QA',           reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Laptop',                                                              employee_code: '1111-0005', employee_name: 'Sachin Tendulkar',  monthly_limit: 2000,  yearly_limit: 5000,  auto_approve: false, auto_approval_limit: 2500, department: 'Sales',        reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Travel',                                                              employee_code: '1111-0006', employee_name: 'Akshay Kumar',      monthly_limit: 4000,  yearly_limit: 10000, auto_approve: false, auto_approval_limit: 2500, department: 'Development',  reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Charger',                                                             employee_code: '1111-0007', employee_name: 'Salman Khan',       monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: true,  auto_approval_limit: 2500, department: 'HR',           reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Food',                                                                employee_code: '1111-0008', employee_name: 'Priyanka Chopra',   monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: false, auto_approval_limit: 2500, department: 'Manager',      reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Laptop',                                                              employee_code: '1111-0009', employee_name: 'Sachin Tendulkar',  monthly_limit: 2000,  yearly_limit: 5000,  auto_approve: true,  auto_approval_limit: 2500, department: 'Manager',      reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Travel',                                                              employee_code: '1111-0010', employee_name: 'Akshay Kumar',      monthly_limit: 4000,  yearly_limit: 10000, auto_approve: false, auto_approval_limit: 2500, department: 'Development',  reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Charger',                                                             employee_code: '1111-0011', employee_name: 'Salman Khan',       monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: false, auto_approval_limit: 2500, department: 'Sales',        reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Food',                                                                employee_code: '1111-0012', employee_name: 'Priyanka Chopra',   monthly_limit: 2500,  yearly_limit: 8000,  auto_approve: true,  auto_approval_limit: 2500, department: 'Management',   reporting_manager: 'Sachin Tendulkar'}
  ];

  public modalRef: BsModalRef;

  public frameworkComponents = { autoApproveCellRenderer: AutoApproveCellRendererComponent };

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }

  onGridReady(params): void {
    this.gridApi = params.api;
  }

  checkInnerWidth(): boolean {
    return (window.innerWidth > 1360) ? false : true;
  }

  onExpenseClick(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  onLimitClick(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }

  onApprovalFlowClick(): void {

  }

  addNewCategory(newCategory): void {
   this.categoryList.push({ name: newCategory, icon: 'fa fa-superpowers', color: 'text-primary'});
  }

  applyToAll(): void {
    this.gridApi.forEachNodeAfterFilter((node) => {
      node.data = {...node.data, ...this.limitObj };
    });

    this.gridApi.refreshView();
    this.limitObj = this.intialStateLimitObj();
  }

  private intialStateLimitObj(): any {
    return {
      auto_approve: null,
      auto_approval_limit: null,
      monthly_limit: null,
      yearly_limit: null
    };
  }

}
