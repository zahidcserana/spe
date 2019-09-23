import { SaleService } from './../../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { SaleModel } from '../../models/sale.model';
import { Pagi } from 'src/app/common/modules/pagination/pagi.model';
import { HomeService } from '../../services/home.service';
import * as $ from 'jquery';
import { ModalService } from 'src/app/common/_modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {
  dataList: SaleModel[] = [];
  pagi: Pagi = new Pagi();
  filter: string;
  orderDetails: any;
  returnItem = {
    sale_id: '',
    item_id: '',
    new_quantity: 0,
    unit_type: '',
  };
  saleItem: any;
  constructor(
    private saleService: SaleService,
    private homeService: HomeService,
    private modalService: ModalService,
  ) {
    this.filter = this.filter ? this.filter : '';
    this.pagi.limit = this.pagi.limit ? this.pagi.limit : 500;
    this.pagi.page = this.pagi.page ? this.pagi.page : 1;
  }

  ngOnInit() {
    this.getSaleList(this.pagi.page, this.pagi.limit, this.filter);
  }
  getSaleList(p, l, q) {
    this.saleService.getSaleList(p, l, q)
      .subscribe(res => {
        this.dataList = res.data;
        this.setData(res);
      });
    console.log(this.dataList);
  }
  reloadTable(e) {
    this.getSaleList(e.page, e.limit, e.filter);
  }
  trackList(index, pro) {
    return pro ? pro.id : null;
  }
  private setData(res) {
    this.pagi.total = res['total'] || 0;
    this.pagi.page = parseInt(res['page_no']) || 1;
    this.pagi.limit = parseInt(res['limit']) || 500;
  }
  openModal(saleId: number, modal: string) {
    $('#print-div').show();
    $('#close-div').show();
    this.getSaleDetails(saleId);
    this.modalService.open(modal);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  getSaleDetails(saleId) {
    this.homeService.saleDetails(saleId)
      .subscribe((data) => this.orderDetails = data);
  }
  itemReturn(item) {
    this.returnItem.item_id = item.id;
    this.returnItem.sale_id = item.sale_id;
    this.returnItem.new_quantity = item.quantity;
    this.returnItem.unit_type = item.unit_type;
    this.saleItem = item;
  }
  submitReturn(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'confirm-button-class btn btn-success modal-button',
        cancelButton: 'cancel-button-class btn btn-danger modal-button',
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.saleService.returnItem(this.returnItem).then(
          res => {
            this.getSaleDetails(this.returnItem.sale_id);
            this.saleItem = '';
          }
        );
      }
    });
  }
  removeItem(item) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.saleService.deleteItem(item.id).then(
          res => {
            this.getSaleDetails(item.sale_id);
          }
        );
      }
    });
  }
}
