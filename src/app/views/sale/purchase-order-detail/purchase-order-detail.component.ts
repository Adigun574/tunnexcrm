import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Formats } from '../../../classes/print';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { SupplierService } from '../../../services/supplier.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent implements OnInit {

  purchaseID
  invoiceNo
  invoice
  loading:boolean = true
  amount
  currentUser:User
  paying:boolean = false
  customers:any[] = []
  fetchingCustomers:boolean = true
  format  = new Formats()
  users:User[] = []
  nairaAmount=0
  foreignAmount=0



  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private saleService:SaleService,
    private customerService:SupplierService,
    private userService:UserService
  ) { 
    this.purchaseID = +this.route.snapshot.params.id
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    // this.getInvoice()
    this.getCustomers()
    this.getUsers()
    this.getPurchaseOrders()
  }


  getPurchaseOrders(){
    this.loading = true
    this.saleService.getPurchaseOrderBySupplierStartDateandEndDate(0,0,0).subscribe(data=>{
      this.loading = false
      // console.log(data)
      let invoices = <any[]>data
      this.invoice = invoices.find(x=>x.id == this.purchaseID)
      let inv=invoices.filter(x=>x.supplierID == this.invoice.supplierID)
      
      for(let i=0;i<inv.length;i++)
      {
          this.nairaAmount+=inv[i].totalAmountNaira;
          this.foreignAmount+=inv[i].totalAmountForeign;
      }
    },
      err=>{
        this.loading = false
        console.log(err)
      })
  }


  

  getCustomers(){
    this.customerService.getAllSuppliers().subscribe(data=>{
      this.customers = <any[]>data
      this.fetchingCustomers = false
    },
      err=>{

      })
  }

  getCustomerName(id){
    let cust = this.customers.find(x=>x.id == id)
    if(!cust){
      return `NIL`
    }
    return `${cust.name}`
  }

  print(){
    this.format.printDiv('toPrint')
  }

  getUsers(){
    this.userService.getUsers().subscribe(data=>{
      // console.log(data)
      this.users = <User[]>data
    },
      err=>{
        // console.log(err)
      })
  }

  getUserName(id){
    let user = this.users.find(x=>x.id == id)
    if(!user){
      return `- -`
    }
    return `${user.name}`
  }

  getCurrencySymbol(currencyName){
    if(currencyName == 'Naira'){
      return '₦'
    }
    else if(currencyName == 'US Dollar'){
      return '$'
    }
    else if(currencyName == 'Pound'){
      return '£'
    }
    else if(currencyName == 'Euro' || currencyName == 'Euor'){
      return '€'
    }
    else if(currencyName == 'Yen'){
      return '¥'
    }
    else{
      return '₦'
    }
  }

}
