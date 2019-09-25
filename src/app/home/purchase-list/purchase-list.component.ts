
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { PurchaseListService } from "./services/purchase-list.service";
import { ModalService } from 'src/app/common/_modal/modal.service';
import * as $ from "jquery";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  constructor(
      private PurchaseListService: PurchaseListService,
      private modalService: ModalService,
    ) 
  {}

  ngOnInit() {
    this.getPurcheseList();
  }

  loader: boolean;
  loader_sub: boolean;
  purchaseList = [];
  purchaseDetails: any;
  purchase: any;

  getPurcheseList(){
    this.PurchaseListService.getPurcheseList().pipe(map(response => {
      return response;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(response => {
      this.loader = false;
      this.purchaseList = response.data;
    });
  }

  openModal(orderId: number, modal: string) {
    $('#print-div').show();
    $('#close-div').show();
    this.getPurchaseDetails(orderId);
    this.modalService.open(modal);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.purchaseDetails = [];
    this.purchase = [];
  }

  getPurchaseDetails(orderId){
    this.PurchaseListService.getPurcheseDetails(orderId).subscribe((response) =>{ 
      this.purchaseDetails = response.data;
      this.purchase = response.purchase[0];
    });
  }

}
