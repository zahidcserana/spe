import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseListRoutingModule } from './purchase-list-routing.module';
import { PurchaseListComponent } from './purchase-list.component';


@NgModule({
  declarations: [PurchaseListComponent],
  imports: [
    CommonModule,
    PurchaseListRoutingModule
  ]
})
export class PurchaseListModule { }
