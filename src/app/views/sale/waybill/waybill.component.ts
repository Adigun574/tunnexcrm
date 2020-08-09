import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Formats } from '../../../classes/print';

@Component({
  selector: 'app-waybill',
  templateUrl: './waybill.component.html',
  styleUrls: ['./waybill.component.css']
})
export class WaybillComponent implements OnInit {

  products:Product[]
  cart = []
  qtyArray = []
  loading:boolean = false
  format  = new Formats()


  constructor(
    private prodcutService:ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.loading = true
    this.prodcutService.getAllProducts().subscribe(data=>{
      this.loading = false
      this.products = <Product[]>data
      console.log(data)
    },
      err=>{
        this.loading = false
        console.log(err)
      })
  }

  addToCart(product){
    this.cart.push(product)
    this.qtyArray.push(1)
  }

  quickSelect(product){
    this.cart.push(product)
    this.qtyArray.push(1)
  }

  deleteProduct(i){
    this.cart.splice(i,1)
    this.qtyArray.splice(i,0)
  }

  reset(){
    this.cart = []
    this.qtyArray = []
  }

  calculateTotal(){

  }

  print(){
    this.format.printDiv('toPrint')
  }

}
