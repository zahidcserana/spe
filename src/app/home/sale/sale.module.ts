import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SaleComponent } from './sale.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from '../services/sale.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule,
    FormsModule,
    SaleRoutingModule,
    NgbModule
  ],
  providers: [SaleService]
})
export class SaleModule { }
