import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';

import * as DashboardStore from 'src/app/store/main/admin/dashboard';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 're-expense-pie-chart',
  templateUrl: './expense-pie-chart.component.html',
  styleUrls: ['./expense-pie-chart.component.scss']
})
export class ExpensePieChartComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

  public chartOptions;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'pie',
        height: 300,
        events: {
          dataPointSelection: (event, chartContext, config) => {
            this.chartClicked(config.dataPointIndex);
          }
        }
      },
      pie: {
        size: 100
      },
      series: [24000, 9000, 15000],
      labels: ['Total Expense', 'Approved', 'Rejected'],
      legend: {
        position: 'bottom'
      }
    };
  }

  chartClicked(index: number): void {
    setTimeout(() => {
      this.router.navigate(['/main/admin/expense'], { queryParams: { status: index } });
      this.store.dispatch(DashboardStore.UpdateTabSelection({ payload: 1 }));
    }, 0);
  }

}
