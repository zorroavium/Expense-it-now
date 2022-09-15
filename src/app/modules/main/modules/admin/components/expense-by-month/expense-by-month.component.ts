import { Component, OnInit } from '@angular/core';
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
  selector: 're-expense-by-month',
  templateUrl: './expense-by-month.component.html',
  styleUrls: ['./expense-by-month.component.scss']
})
export class ExpenseByMonthComponent implements OnInit {

  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'line',
        height: 330,
      },
      series: [
        {
          name: 'sales',
          data: [40, 30, 40, 60, 35, 50, 49, 60, 70, 50, 91, 125]
        }
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
  }
}
