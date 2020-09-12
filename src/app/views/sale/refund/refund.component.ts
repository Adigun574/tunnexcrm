import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { ProductService } from '../../../services/product.service';
import { SaleService } from '../../../services/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.css']
})
export class RefundComponent implements OnInit {

  invoiceNo
  products:any[] = []
  cart:any[] = []
  quantity = []
  saving:boolean = false
  currentUser: User;


  constructor(
    private productService:ProductService,
    private salesService:SaleService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = <any[]>data
    },
      err=>{
      })
  }

  addProduct(e){
    this.cart.push(e)
    this.quantity.push(1)
    // this.unitPrice.push(0)
    // console.log(this.cart)
  }


  reset(){
    this.cart = []
    this.quantity = []
    this.invoiceNo = null
  }

  setQuantity(value,i){
    this.quantity[i] = value
  }

  removeItem(i){
    this.cart.splice(i,1)
    this.quantity.splice(i,1)
    // this.unitPrice.splice(i,1)
  }

  saveRefund(){
    if(this.invoiceNo){
      this.saving = true
      let itemsArray = []
      this.cart.forEach((car,index)=>{
        itemsArray.push({
              id: 0,
              cartID: 0,
              name: car.name,
              // code: car.code,
              quantity: +this.quantity[index],
              amount: 0,
              productID: car.id
        })
      })
      let obj = {
        id: 0,
        dateCreated: "2020-09-12T10:09:51.703Z",
        cart: {
          code: "string",
          items:itemsArray,
          amount: 0,
          transactionType: true,
          id: 0,
          userCreated: this.currentUser.id,
          userModified: 0,
          dateCreated: "2020-09-12T10:09:51.703Z",
          dateModified: "2020-09-12T10:09:51.703Z"
        },
        cartID: 0,
        invoiceNo: this.invoiceNo,
        refundAmount: 0
      }
      console.log(obj)
      this.salesService.salesRefund(obj).subscribe(data=>{
        this.saving = false
        this.reset()
        // console.log(data)
        Swal.fire(
          'Success',
          'Refund Completed',
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

}
