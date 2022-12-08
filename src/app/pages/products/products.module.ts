import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { CreateProductsComponent } from './products/pages/create-products/create-products.component';
import { PreviewProductsComponent } from './products/pages/preview-products/preview-products.component';
import { SplitTextModule } from 'src/app/core/pipes/split-text/split-text.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './products/pages/edit-product/edit-product.component';


@NgModule({
  declarations: [
    ProductsComponent,
    CreateProductsComponent,
    PreviewProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    SplitTextModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
