import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { Formats } from '../../../classes/print';
import { ProductService } from '../../../services/product.service';
import { CustomerService } from '../../../services/customer.service';


@Component({
  selector: 'app-view-waybill',
  templateUrl: './view-waybill.component.html',
  styleUrls: ['./view-waybill.component.css']
})
export class ViewWaybillComponent implements OnInit {

  waybillID
  loading:boolean = false
  waybills:any[] = []
  waybill
  format  = new Formats()
  products:any[] = []
  customers:any[] = []



  constructor(
    private route:ActivatedRoute,
    private saleService:SaleService,
    private productService:ProductService,
    private customerService:CustomerService
  ) { 
    this.waybillID = +this.route.snapshot.params.id
    // console.log(this.waybillID)
  }

  ngOnInit(): void {
    this.getProducts()
    this.getWaybills(0,0)
    this.getCustomers()
  }

  getWaybills(startDate,endDate){
    this.loading = true
    this.saleService.getWaybill(startDate,endDate).subscribe(data=>{
      console.log(data)
      this.waybills = <any[]>data
      this.waybill = this.waybills.find(x=>x.id == this.waybillID)
      this.loading = false
    },
      err=>{
        console.log(err)
        this.loading = false
      })
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      // console.log(data)
      this.products = <any[]>data
    },
      err=>{
        console.log(err)
      })
  }

  getProductName(id){
    return this.products.find(x=> x.id == id).name
  }

  print(){
    this.format.printDiv('toPrint')
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      console.log(data)
      this.customers = <any>data
    },
      err=>{
        console.log(err)
      })
  }

  getCustomerName(id){
    let customer = this.customers.find(x=>x.id == id)
    if(customer){
      return `${customer.firstName} ${customer.lastName}`
    }
    else{
      return 'NIL'
    }
  }

}
