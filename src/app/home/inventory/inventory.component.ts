import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { InventoryService } from './services/inventory.service';
import * as $ from "jquery";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    private InventoryService: InventoryService,
  ) { }

  ngOnInit() {
    this.getInventoryList();
    this.getCompanyList();
  }

  loader: boolean;
  loader_sub: boolean;
  inventoryList = [];
  companyList: any[] = [];
  medicineList = [];

  searchData: any[] = [];
  medicineSearch: any = {
    search: ""
  };

  filterItem: any = {
    medicine: '',
    medicine_id: '',
    company: '',
    quantity: ''
  }

  filterList(){
    for (let medicine of this.searchData) {
      if (medicine.name == this.filterItem.medicine) {
        this.filterItem.medicine_id = medicine.id;
      }
    }

    if(this.filterItem.company || this.filterItem.medicine_id || this.filterItem.quantity){
      this.loader = true;
      this.InventoryService.getInventoryFilterList(JSON.stringify(this.filterItem)).pipe(map(response => {
        return response;
      }), catchError(err => {
        this.loader = false;
        return of([]);
      })).subscribe(response => {
        this.loader = false;
        this.inventoryList = response.data;
      });
    }
  }

  resetList(){
    this.getInventoryList();
    this.filterItem = {
      medicine: '',
      medicine_id: '',
      company: '',
      quantity: ''
    };
  }

  getCompanyList(){
    this.InventoryService.getCompanyList().pipe(map(response => {
      return response;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(response => {
      this.loader = false;
      this.companyList = response;
    });
  }

  getInventoryList(){
    this.InventoryService.getInventoryList().pipe(map(response => {
      return response;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(response => {
      this.loader = false;
      this.inventoryList = response.data;
    });
  }

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

    return this.InventoryService.searchMedicine(params).pipe(
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

}
