import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseListRoutingModule } from './purchase-list-routing.module';
import { PurchaseListComponent } from './purchase-list.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'src/app/common/_modal/modal.module';
import { PurchaseListService } from './services/purchase-list.service'


@NgModule({
  declarations: [PurchaseListComponent],
  imports: [
    FormsModule,
    CommonModule,
    ModalModule,
    NgbModule,
    PurchaseListRoutingModule
  ],
  providers: [PurchaseListService]
})
export class PurchaseListModule { }
