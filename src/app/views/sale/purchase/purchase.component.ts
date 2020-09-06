import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SupplierService } from '../../../services/supplier.service';
import { Purchase } from '../../../models/purchase';
import { SaleService } from '../../../services/sale.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  products:any[] = []
  suppliers:any[] = []
  cart:any[] = []
  currency = [
    {name:'Naira'},
    {name:'US Dollar'},
    {name:'Pound'},
    {name:'Euro'},
    {name:'Yen'}
  ]
  quantity = []
  invoice = new Purchase()
  invoiceNo
  selectedSupplier
  selectedCurrency
  nairaEquivalent
  currentUser
  saving:boolean = false
  unitPrice = []

  constructor(
    private productService:ProductService,
    private supplierService:SupplierService,
    private saleService:SaleService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getProducts()
    this.getSuppliers()
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = <any[]>data
    },
      err=>{
      })
  }

  getSuppliers(){
    this.supplierService.getAllSuppliers().subscribe(data=>{
      this.suppliers = <any[]>data
    })
  }

  addProduct(e){
    this.cart.push(e)
    this.quantity.push(1)
    this.unitPrice.push(0)
    // console.log(this.cart)
  }

  setQuantity(value,i){
    this.quantity[i] = value
  }

  setUnitPrice(value,i){
    this.unitPrice[i] = value
  }

  selectSupplier(e){
    this.selectedSupplier = e
  }

  selectCurrency(e){
    this.selectedCurrency = e
  }

  saveInvoice(){
    this.saving = true
    this.invoice.invoiceNo = this.invoiceNo
    this.invoice.userCreated = this.currentUser.id
    this.invoice.userModified = this.currentUser.userModified
    this.invoice.exchangeCurrency = this.selectedCurrency.name
    this.invoice.nairaEquivalent = this.nairaEquivalent
    this.invoice.supplierID = this.selectedSupplier.id
    let cart = {
          code:'string',
          items: [],
          amount: 0,
          transactionType: true,
          id: 0,
          userCreated: this.currentUser.id,
          userModified: this.currentUser.userModified,
    }
    this.cart.forEach((product,index)=>{
      cart.items.push({
            id: 0,
            cartID: 0,
            name: product.name,
            code: 'string',
            quantity: +this.quantity[index],
            amount: +this.unitPrice[index],
            productID: product.id
      })
    })
    this.invoice.cart = cart
    // console.log(this.invoice)
    // console.log(JSON.stringify(this.invoice))
    // return
    this.saleService.savePurchaeOrder(this.invoice).subscribe(data=>{
      this.saving = false
      // console.log(data)
      Swal.fire(
        'Success',
        'Purchase Order Raised',
        'success'
      )
    },
      err=>{
        this.saving = false
        // console.log(err)
        Swal.fire(
          'Oops',
          'Something went wrong',
          'error'
        )
      })
  }

  reset(){
    this.cart = []
    this.quantity = []
    this.invoice = new Purchase()
    this.invoiceNo = null
    this.selectedSupplier = null
    this.selectedCurrency = null
    this.nairaEquivalent = null
    this.saving = false
    this.unitPrice = []
  }

  removeItem(i){
    this.cart.splice(i,1)
    this.quantity.splice(i,1)
    this.unitPrice.splice(i,1)
  }

}