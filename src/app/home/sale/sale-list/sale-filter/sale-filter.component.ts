import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FORMAT_SEARCH } from 'src/app/common/_classes/functions';
import { SaleFilterModel } from 'src/app/home/models/sale.model';
import { BsDatepickerModule } from 'ngx-bootstrap';


declare let $: any;
declare var moment: any;

@Component({
  selector: 'app-sale-filter',
  templateUrl: './sale-filter.component.html',
  styleUrls: ['./sale-filter.component.css']
})
export class SaleFilterComponent implements OnInit {
  dateRangeValue: Date[];
  nextDate = new Date();
  saleData: SaleFilterModel;
  filter: string;
  search: boolean;
  sub: Subscription;
  @Output('loadList') loadList: EventEmitter<string> = new EventEmitter();

  constructor(private route: ActivatedRoute) {
    this.nextDate.setDate(this.nextDate.getDate() + 7);
    this.dateRangeValue= [new Date(), this.nextDate];
    this.saleData = new SaleFilterModel();
    this.sub = this.route.paramMap.subscribe(
      val => {
        this.reset();
      }
    );
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // this._dateRange();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode("day");
  }

  reset() {
    this.saleData = new SaleFilterModel();
    this.saleData.date_start = null;
    this.saleData.date_end = null;
  }
  searchSaleData() {
    this.filter = FORMAT_SEARCH(this.saleData);
    if (this.filter) {
      this.loadList.emit(this.filter);
      this.search = true;
    }
  }
  resetSearch() {
    this.reset();
    this.filter = null;
    if (this.search) {
      this.loadList.emit('');
      this.search = false;
    }
  }
  private _dateRange() {
    $('#m_daterangepicker_3').daterangepicker({
      opens: 'left',
      startDate: moment(),
      endDate: moment().endOf('month'),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      autoUpdateInput: true,
      buttonClasses: 'm-btn btn',
      applyClass: 'btn-brand',
      cancelClass: 'btn-danger'
    }, (start, end, label) => {
      this.saleData.date_start = start.format('YYYY-MM-DD');
      this.saleData.date_end = end.format('YYYY-MM-DD');
      $('#m_daterangepicker_3 .form-control').val('From ' + start.format('YYYY-MM-DD') + ' To ' + end.format('YYYY-MM-DD'));
    });
  }
}
