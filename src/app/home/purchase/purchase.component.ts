import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { PurchaseService } from "./services/purchase.service";
import * as $ from "jquery";
import Swal from 'sweetalert2';
import { numberFormat } from 'highcharts/highcharts.src';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private PurchaseService: PurchaseService) { }

  ngOnInit() {
    var local_item = JSON.parse(localStorage.getItem('purchaseItems'));
    if(local_item){
      this.allPurchaseItems = local_item;
      var grand_total = 0;
      this.allPurchaseItems.forEach((item, index) => {
        grand_total = grand_total + Number(item.amount);
      });
      this.purchaseDetails.total = grand_total;
      this.purchaseDetails.net_amount = grand_total;
      this.purchaseDetails.advance = grand_total;
    }
    this.getCompanyList();
  }

  searchList: any[];
  medicineList = [];
  allPurchaseItems = [];
  companyList: any[] = [];

  loader: boolean;
  searchData: any[] = [];
  loader_sub: boolean;
  medicineSearch: any = {
    search: ""
  };

  purchaseItem: any = {
    medicine: "",
    medicine_id: "",
    quantity: "",
    batch_no: "",
    exp_date: "",
    piece_per_box: "",
    box_trade_price: "",
    box_mrp: "",
    amount: "",
    remarks: ""
  };

  purchaseDetails: any = {
    total: "",
    vat: "",
    vat_percentage: "fixed",
    discount: "",
    net_amount: 0,
    advance: "",
    due: "",
    invoice: "",
    company: "",
  };

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.searchData = [];
        this.loader_sub = true;
      }),
      switchMap(term => {
        this.loader_sub = true;
        this.medicineSearch.search = term.trim();
        return this.getMedicineList(this.medicineSearch);
      })
    );
  };

  getMedicineList(params): any {
    if (!params && params === "") {
      this.loader_sub = false;
      return [];
    }

    return this.PurchaseService.searchMedicine(params).pipe(
      map(res => {
        this.medicineList = [];
        this.loader_sub = false;
        this.searchData = res;
        for (let medicine of res) {
          this.medicineList.push(medicine.name);
        }
        return this.medicineList;
      }),
      catchError(() => {
        this.loader_sub = false;
        return [];
      })
    );
  }

  getCompanyList(){
    this.PurchaseService.getCompanyList().pipe(map(response => {
      return response;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(response => {
      this.loader = false;
      this.companyList = response;
    });
  }

  submitPurchaseDetails(){
    let allParams = {
      'details': this.purchaseDetails,
      'items': this.allPurchaseItems
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success modal-button',
        cancelButton: 'btn btn-danger modal-button'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Do you want submit details?',
      text: "Please check all the details!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this.PurchaseService.submitItem(allParams)
        .then(response => {

          localStorage.removeItem("purchaseItems");
          $("#typeahead-basic").focus();
          this.purchaseDetails = {};
          this.purchaseDetails.vat_percentage = 'fixed';
          this.purchaseItem = {};
          this.purchaseItem.net_amount = 0;
          this.allPurchaseItems = [];

          swalWithBootstrapButtons.fire(
            'Purchase details submitted successful!',
            'Successful!',
            'success'
          );
      
        })
        .catch(err => {
          console.log(err)
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  }

  calculateVat(){
    var grand_total = this.purchaseDetails.total;
    var vat = this.purchaseDetails.vat;
    var discount = this.purchaseDetails.discount;
    if(vat){
      if(this.purchaseDetails.vat_percentage === "fixed")
      {
        var net_amount = Number(grand_total) + Number(this.purchaseDetails.vat);

        if(discount){
          if(Number(discount) >= Number(grand_total)){
            this.purchaseDetails.net_amount = Number(net_amount);
            this.purchaseDetails.advance = this.purchaseDetails.net_amount;
            this.purchaseDetails.discount = 0;
          }else{
            if(Number(discount) < 0){
              this.purchaseDetails.discount = 0;
            }else{
              this.purchaseDetails.net_amount = Number(net_amount) - Number(discount);
              this.purchaseDetails.advance = this.purchaseDetails.net_amount;
            }
          }
        }else{
          this.purchaseDetails.net_amount = net_amount;
          this.purchaseDetails.advance = net_amount;
        }
        this.purchaseDetails.due = 0;
      }else
      {
        var calculatedVat = (Number(grand_total) * Number(vat)) / 100;
        var net_amount = Number(grand_total) + Number(calculatedVat);

        if(discount){
          if(Number(discount) >= Number(grand_total)){
            this.purchaseDetails.net_amount = Number(net_amount);
            this.purchaseDetails.advance = this.purchaseDetails.net_amount;
            this.purchaseDetails.discount = 0;
          }else{
            if(Number(discount) < 0){
              this.purchaseDetails.discount = 0;
            }else{
              this.purchaseDetails.net_amount = Number(net_amount) - Number(discount);
              this.purchaseDetails.advance = this.purchaseDetails.net_amount;
            }
          }
        }else{
          this.purchaseDetails.net_amount = net_amount;
          this.purchaseDetails.advance = net_amount;
        }
        this.purchaseDetails.due = 0;
      }
    }else
    {
      if(discount){
        if(Number(discount) >= Number(grand_total)){
          this.purchaseDetails.net_amount = Number(net_amount);
          this.purchaseDetails.advance = this.purchaseDetails.net_amount;
          this.purchaseDetails.discount = 0;
        }else{
          if(Number(discount) < 0){
            this.purchaseDetails.discount = 0;
          }else{
            this.purchaseDetails.net_amount = Number(grand_total) - Number(discount);
            this.purchaseDetails.advance = this.purchaseDetails.net_amount;
          }
        }

      }else{
        this.purchaseDetails.net_amount = grand_total;
        this.purchaseDetails.advance = grand_total;
      }
      this.purchaseDetails.due = 0;
    }
  }

  claculateDue(){
    if(Number(this.purchaseDetails.net_amount) < Number(this.purchaseDetails.advance)){
      this.purchaseDetails.due = 0;
      this.purchaseDetails.advance = this.purchaseDetails.net_amount;
    }else{
      this.purchaseDetails.due = Number(this.purchaseDetails.net_amount) - Number(this.purchaseDetails.advance);
    }
  }

  addMedicine(){
    console.log('Add Medicine');
    if(this.purchaseItem.medicine && this.purchaseItem.quantity && this.purchaseItem.box_mrp && this.purchaseItem.piece_per_box)
    {
      for (let medicine of this.searchData) {
        if (medicine.name == this.purchaseItem.medicine) {
          this.purchaseItem.medicine_id = medicine.id;
        }
      }
      this.purchaseItem.amount = Number(this.purchaseItem.quantity) * Number(this.purchaseItem.box_mrp);
      
      localStorage.removeItem("purchaseItems");
      this.allPurchaseItems.push(this.purchaseItem);

      var grand_total = 0;
      this.allPurchaseItems.forEach((item, index) => {
        grand_total = grand_total + Number(item.amount);
      });
      this.purchaseDetails.total = grand_total;
      this.purchaseDetails.net_amount = grand_total;
      this.purchaseDetails.vat = 0;
      this.purchaseDetails.discount = 0;
      this.purchaseDetails.advance = grand_total;
      this.purchaseDetails.due = 0;

      localStorage.setItem('purchaseItems', JSON.stringify(this.allPurchaseItems));

      this.purchaseItem = {};
      $("#typeahead-basic").focus();
    }
  }

  deleteRow(row){
    this.allPurchaseItems.splice(row, 1);
    localStorage.removeItem("purchaseItems");
    localStorage.setItem('purchaseItems', JSON.stringify(this.allPurchaseItems));
    var grand_total = 0;
    this.allPurchaseItems.forEach((item, index) => {
      grand_total = grand_total + Number(item.amount);
    });
    this.purchaseDetails.total = grand_total;
    this.purchaseDetails.net_amount = grand_total;
    this.purchaseDetails.vat = 0;
    this.purchaseDetails.discount = 0;
    this.purchaseDetails.advance = grand_total;
    this.purchaseDetails.due = 0;
    $("#typeahead-basic").focus();
  }
}
