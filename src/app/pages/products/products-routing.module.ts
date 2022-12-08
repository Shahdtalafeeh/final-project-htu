import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductsComponent } from './products/pages/create-products/create-products.component';
import { EditProductComponent } from './products/pages/edit-product/edit-product.component';
import { PreviewProductsComponent } from './products/pages/preview-products/preview-products.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'all-products',
    component: ProductsComponent,
  },
  {
    path: 'create-products',
    component: CreateProductsComponent,
  },
  {
    path: 'preview-products',
    component: PreviewProductsComponent,
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
