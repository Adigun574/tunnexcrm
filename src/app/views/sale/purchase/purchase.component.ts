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
    {name:'Euor'},
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
    // console.log(this.cart)
  }

  setQuantity(value,i){
    this.quantity[i] = value
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
    this.invoice.userCreated = this.currentUser.userCreated
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
          userCreated: this.currentUser.userCreated,
          userModified: this.currentUser.userModified,
    }
    this.cart.forEach(product=>{
      cart.items.push({
            id: 0,
            cartID: 0,
            name: product.name,
            code: 'string',
            quantity: product.quantity,
            amount: product.costPrice,
            productID: product.id
      })
    })
    this.invoice.cart = cart
    // console.log(this.invoice)
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

}