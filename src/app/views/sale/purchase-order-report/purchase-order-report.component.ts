import { Component, OnInit } from '@angular/core';
import { Formats } from '../../../classes/print';
import { SaleService } from '../../../services/sale.service';
import { SupplierService } from '../../../services/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-report',
  templateUrl: './purchase-order-report.component.html',
  styleUrls: ['./purchase-order-report.component.css']
})
export class PurchaseOrderReportComponent implements OnInit {

  sales:any[] = []
  customers:any[] = []
  loadingReport:boolean = false
  format = new Formats()
  today
  filterVal
  startDate = `0000-00-00`
  endDate = `0000-00-00`
  selectedCustomer

  constructor(
    private saleService:SaleService,
    private customerService:SupplierService,
    private router:Router
  ) { 
    let d = new Date()
    let day:any = d.getDate()
    let month:any = d.getMonth()+1
    let year:any = d.getFullYear()
    if(day<10){
      day = `0${day}`
    }
    if(month<10){
      month = `0${month}`
    }
    this.today = `${day}-${month}-${year}`
  }

  ngOnInit(): void {
    this.getCustomers()
    this.getSalesByCustStartandEndDate(0,0,0)
  }

  getSalesByCustStartandEndDate(customerID,startDate,endDate){
    this.loadingReport = true
    this.saleService.getPurchaseOrderBySupplierStartDateandEndDate(customerID,startDate,endDate).subscribe(data=>{
      this.loadingReport = false
      // console.log(data)
      this.sales = <any[]>data
    },
      err=>{
        this.loadingReport = false
        console.log(err)
      })
  }

  refresh(){
    this.getSalesByCustStartandEndDate(0,0,0)
  }

  filterSales(){
    // console.log(this.startDate,this.endDate)
    if(!this.selectedCustomer){
      this.selectedCustomer = {id:0}
    }
    let d = this.startDate.split('-')
    let startDate = `${d[2]}-${d[1]}-${d[0]}`
    let e = this.endDate.split('-')
    let endDate = `${e[2]}-${e[1]}-${e[0]}`
    // console.log(this.selectedCustomer.id,startDate,endDate)
    if(startDate == '00-00-0000'){
      startDate = '0'
    }
    if(endDate == '00-00-0000'){
      endDate = '0'
    }
    // console.log(this.selectedCustomer.id,startDate,endDate)  
    this.getSalesByCustStartandEndDate(this.selectedCustomer.id,startDate,endDate)
  }

  test(){
    this.format.printDiv('toPrint')
  }

  // refresh(){
  //   this.getSalesByDate(this.today)
  // }

  // filterSales(){
  //   let d = this.filterVal.split('-')
  //   let newDate = `${d[2]}-${d[1]}-${d[0]}`
  //   this.getSalesByDate(newDate)
  // }

  // getSalesByDate(date){
  //   this.loadingReport = true
  //   // '28-05-2020'
  //   this.saleService.getSalesByDate(date).subscribe(data=>{
  //     this.sales = <any[]>data
  //     this.loadingReport = false
  //   },
  //     err=>{
  //       this.loadingReport = false
  //     })
  // }

  getCustomers(){
    // this.customerService.getAllCustomers().subscribe(data=>{
      this.customerService.getAllSuppliers().subscribe(data=>{
      this.customers = <any[]>data
      // console.log(this.customers)
      this.customers.forEach(cust=>cust.fullName = `${cust.name}`)
    })
  }

  getCustomerName(id){
    try{
    let customer = this.customers.find(x=>x.id == id)
    return `${customer.name}`
    }
    catch{
      return `NIL`
    }
    
  }

  print(id){
    this.format.printDiv(id)
  }

  openInvoice(id){
    // console.log(customerID,invoiceNo)
    this.router.navigateByUrl(`/main/purchase-order/${id}`)
  }
}
