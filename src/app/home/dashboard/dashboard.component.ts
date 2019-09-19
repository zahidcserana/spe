import { Component, OnInit } from '@angular/core';
import { DashboardModel } from '../models/dashboard.model';
import { StockChart } from 'angular-highcharts';
import { HomeService } from '../services/home.service';
import { ScriptLoaderService } from 'src/app/common/script-loader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  summary: DashboardModel = new DashboardModel();
  order: StockChart;
  sale: StockChart;
  statistics;
  orderData = [];
  saleData = [];
  constructor(
    private homeService: HomeService,
    private _script: ScriptLoaderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getSummary();
    this.statistics = this.route.data.subscribe(
      val => {
        this.statistics = val && val['dashboard'] ? val['dashboard'] : [];
        this.orderData = this.statistics.order;
        this.saleData = this.statistics.sale;
        console.log(this.statistics);
      }
    );
    this.getOrderChart();
    this.getSaleChart();
  }
  getSummary() {
    this.homeService.getSummary()
      .subscribe((res) => {
        this.summary = res;
      });
  }
  getOrderChart() {
    this.order = new StockChart({
      title: {
        // text: 'Purchase Chart'
      },
      rangeSelector: {
        selected: 0,
        inputEnabled: false
      },
      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: 'Purchase',
        data: this.orderData,
        type: undefined
      }]
    });
  }

  getSaleChart() {
    this.sale = new StockChart({
      title: {
        // text: 'Sale Chart'
      },
      rangeSelector: {
        selected: 0,
        inputEnabled: false
      },
      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: 'Sale',
        data: this.saleData,
        type: undefined
      }]
    });
  }
}
