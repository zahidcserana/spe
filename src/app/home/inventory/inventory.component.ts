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
  }

  loader: boolean;
  loader_sub: boolean;
  inventoryList = [];

  getInventoryList(){
    console.log("Purchase List");
    this.InventoryService.getInventoryList().pipe(map(response => {
      return response;
    }), catchError(err => {
      this.loader = false;
      return of([]);
    })).subscribe(response => {
      this.loader = false;
      this.inventoryList = response.data;
      console.log(response.data);
    });
  }

}
