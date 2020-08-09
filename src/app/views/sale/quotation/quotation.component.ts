import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Formats } from '../../../classes/print';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { SaleService } from '../../../services/sale.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  products:Product[]
  cart = []
  qtyArray = []
  loading:boolean = false
  format  = new Formats()
  customers=[]
  selectedCustomer:Customer
  savingQuotation:boolean = false
  


  constructor(
    private prodcutService:ProductService, 
    private customerService:CustomerService,
    private saleService:SaleService
  ) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCustomers()
  }

  getProducts(){
    this.loading = true
    this.prodcutService.getAllProducts().subscribe(data=>{
      this.loading = false
      this.products = <Product[]>data
      // console.log(data)
    },
      err=>{
        this.loading = false
        console.log(err)
      })
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <any[]>data
      this.customers.forEach(cust=>cust.fullName = `${cust.firstName} ${cust.lastName}`)
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

  saveQuotation(){
    this.savingQuotation = true
    let obj = {
      quotProducts:null,
      customerID:null,
      id:0,
      userCreated: 0,
      userModified: 0,
    }
    let quotProducts = []
    this.cart.forEach(item=>{
      quotProducts.push({
        productID:item.id
      })
    })
    obj.quotProducts = quotProducts
    obj.customerID = this.selectedCustomer.id
    console.log(obj)
    console.log(JSON.stringify(obj))
    this.saleService.saveQuotation(obj).subscribe(data=>{
      this.savingQuotation = false
      console.log(data)
      Swal.fire(
        'Success',
        'Quotation Saved',
        'success'
      )
    },
      err=>{
      this.savingQuotation = false
        console.log(err)
        Swal.fire(
          'Oops',
          'Something went wrong',
          'error'
        )
      })
  }

}
