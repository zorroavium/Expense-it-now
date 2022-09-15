import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseGridComponent } from 'app/shared/components/expense-grid/expense-grid.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 're-expense-screen',
  templateUrl: './expense-screen.component.html',
  styleUrls: ['./expense-screen.component.scss']
})
export class ExpenseScreenComponent implements OnInit {

  @ViewChild(ExpenseGridComponent)
  public expenseGrid: ExpenseGridComponent;

  public columnDefs = [
    { headerName: 'Expense',                        field: 'expense'},
    { headerName: 'Employee Code',                  field: 'employee_code' },
    { headerName: 'Employee Name',                  field: 'employee_name', width: 'auto' },
    { headerName: 'Monthly Limit',                  field: 'monthly_limit' },
    { headerName: 'Yearly Limit',                   field: 'yearly_limit' },
    { headerName: 'Auto Approved (Within Limits)',  field: 'auto_approved' },
    { headerName: 'Department',                     field: 'department' },
    { headerName: 'Reporting Manager',              field: 'reporting_manager', width: 200 }
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
    rowHeight: 30,
  };

  public rowData = [
    { expense: 'Laptop',  employee_code: '1111-0001', employee_name: 'Sachin Tendulkar',  monthly_limit: 2000,  yearly_limit: 5000, auto_approved: false, department: 'sales', reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Travel',  employee_code: '1111-0002', employee_name: 'Akshay Kumar',      monthly_limit: 4000,  yearly_limit: 10000, auto_approved: false, department: 'IT', reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Charger', employee_code: '1111-0003', employee_name: 'Salman Khan',       monthly_limit: 2500,  yearly_limit: 8000, auto_approved: false, department: 'QA', reporting_manager: 'Sachin Tendulkar'},
    { expense: 'Food',    employee_code: '1111-0004', employee_name: 'Priyanka Chopra',   monthly_limit: 2500,  yearly_limit: 8000, auto_approved: false, department: 'QA', reporting_manager: 'Sachin Tendulkar'}
  ];

  public chartOptions: Partial<ChartOptions>;
  public chartOptionsLine: Partial<ChartOptions>;
  public collapsed = false;
  public form: FormGroup;
  public clickedChartIndex = null;
  public appliedFilterModel = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    if (window.location.hash.includes('status')) {
      this.clickedChartIndex = +window.location.hash.split('status=')[1];
      const status = this.clickedChartIndex === 0 ? '' : (this.clickedChartIndex === 1 ? 'Approved' : 'Rejected');
      this.appliedFilterModel = { expense_status: { filter: status, filterType: 'text', type: 'containes' }};
    }

    this.form = this.createForm();

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 330,
      },
      series: [
        {
          name: 'sales',
          data: [20000, 10000, 15000, 6000, 8000, 5000]
        }
      ],
      xaxis: {
        categories: ['Equipment', 'Travel', 'Canteen', 'Training', 'Medical', 'Stationary']
      }
    };


    this.chartOptionsLine = {
      series: [
        {
          name: 'expenses',
          data: [20000, 10000, 15000, 6000, 8000, 5000]
        }
      ],
      chart: {
        height: 330,
        type: 'radar'
      },
      xaxis: {
        categories: ['Equipment', 'Travel', 'Canteen', 'Training', 'Medical', 'Stationary']
      }
    };

  }

  search(): void {
    const filterToBeApplied = this.form.value.status;
    this.appliedFilterModel = { expense_status: { filter: filterToBeApplied, filterType: 'text', type: 'containes' }};

    this.expenseGrid.applyFilter(this.appliedFilterModel);
  }

  private createForm(): FormGroup {
    return this.fb.group({
      employeeCode: [],
      employeeName: [],
      category: [],
      expenseDate: [],
      description:[],
      status: []
    });
  }

}
