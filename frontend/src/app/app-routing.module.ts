import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManagementComponent } from './features/products/pages/product-management/product-management.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductManagementComponent
  },  
   { path: '', redirectTo: '/products', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
