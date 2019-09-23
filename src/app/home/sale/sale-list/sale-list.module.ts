import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleListComponent } from './sale-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { PaginationModule } from 'src/app/common/modules/pagination/pagination.module';
import { ModalModule } from 'src/app/common/_modal/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SaleListComponent,
  }
];
@NgModule({
  declarations: [SaleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PaginationModule,
    ModalModule,
    NgbModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [SaleService]
})
export class SaleListModule { }
