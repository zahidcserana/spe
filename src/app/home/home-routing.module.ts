import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'inventory',
        loadChildren: './inventory/inventory.module#InventoryModule',
      },
      {
        path: 'sale',
        loadChildren: './sale/sale.module#SaleModule',
      },
      {
        path: 'purchase',
        loadChildren: './purchase/purchase.module#PurchaseModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
