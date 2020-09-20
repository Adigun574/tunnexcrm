import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waybill2',
  templateUrl: './waybill2.component.html',
  styleUrls: ['./waybill2.component.css']
})
export class Waybill2Component implements OnInit {

  products:any[] = []
  waybills:any[] = []
  loadingReport:boolean = false
  startDate
  endDate

  constructor(
    private saleService:SaleService, 
    private productService:ProductService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getWaybills(0,0)
  }

  getWaybills(startDate,endDate){
    this.loadingReport = true
    this.saleService.getWaybill(startDate,endDate).subscribe(data=>{
      // console.log(data)
      this.waybills = <any[]>data
      this.loadingReport = false
    },
      err=>{
        console.log(err)
        this.loadingReport = false
      })
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      // console.log(data)
      this.products = <Product[]>data
    },
      err=>{
        console.log(err)
      })
  }

  filterWaybill(){
    let d = this.startDate.split('-')
    let startDate = `${d[2]}-${d[1]}-${d[0]}`
    let e = this.endDate.split('-')
    let endDate = `${e[2]}-${e[1]}-${e[0]}`
    console.log(startDate,endDate)
    if(startDate == '00-00-0000'){
      startDate = '0'
    }
    if(endDate == '00-00-0000'){
      endDate = '0'
    }
    this.getWaybills(startDate,endDate)
  }

  refresh(){
    this.getWaybills(0,0)
  }

  openInvoice(waybillID){
    this.router.navigateByUrl(`main/view-waybill/${waybillID}`)
  }

  getProductName(id){
    let product = this.products.find(x=>x.id == id)
    if(product){
      return product.name
    }
    else{
      return 'NIL'
    }
    // return this.products.find(x=> x.id == id).name
  }

}
