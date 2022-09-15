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
  selector: 're-expense-snapshot',
  templateUrl: './expense-snapshot.component.html',
  styleUrls: ['./expense-snapshot.component.scss']
})
export class ExpenseSnapshotComponent implements OnInit {

  public chartOptions;

  public chartOptionsCategory;

  constructor() { }

  ngOnInit(): void {

    this.chartOptionsCategory = {
      chart: {
        type: 'bar',
        width: 400,
        height: 200
      },
      series: [
        {
          name: 'sales',
          data: [4000, 3000, 4000, 10000, 3500]
        }
      ],
      xaxis: {
        categories: ['Travel', 'Canteen', 'Equipment', 'Medical', 'Course']
      }
    };

  }

}
