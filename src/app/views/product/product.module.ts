import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../../shared/shared.module';
import { EditProductComponent } from './edit-product/edit-product.component';



@NgModule({
  declarations: [ProductsComponent, EditProductComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProductModule { }
