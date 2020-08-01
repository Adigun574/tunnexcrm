import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;
import { ProductService } from '../../../services/product.service' ;
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId:number
  product:Product
  // product
  updating:boolean = false
  loadingProduct = true
  deleting:boolean = false

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private router:Router
  ) { 
    this.productId = +this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.productService.getProductById(this.productId).subscribe(data=>{
      this.product = <Product>data
      this.loadingProduct = false
      // console.log(this.product)
    },
      err=>{
        this.loadingProduct = false
      })
  }

  updateProduct(){
    this.updating = true
    this.product.quantity = +this.product.quantity
    this.product.salePrice = +this.product.salePrice
    this.product.costPrice = +this.product.costPrice
    // console.log(this.product)
    this.productService.updateProduct(this.product).subscribe(data=>{
      this.updating = false
      this.router.navigateByUrl('main/products')
    },
      err=>{
        this.updating = false
      })
  }

  deleteProduct(id){
    this.deleting = true
    this.productService.deleteProduct(id).subscribe(data=>{
      console.log(data)
      this.deleting = false
      this.router.navigateByUrl('main/products')
    },
      err=>{
        console.log(err)
        this.deleting = false
      })
  }

}
