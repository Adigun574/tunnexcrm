import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { Formats } from '../../../classes/print';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  sales:any[] = []
  customers:any[] = []
  loadingReport:boolean = false
  format = new Formats()
  today
  filterVal

  constructor(
    private saleService:SaleService,
    private customerService:CustomerService,
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
    // this.getSales()
    this.getSalesByDate(this.today)
  }

  test(){
    this.format.printDiv('toPrint')
  }

  // getSales(){
  //   this.loadingReport = true
  //   this.saleService.getAllSales().subscribe(data=>{
  //     this.sales = <any[]>data
  //     this.loadingReport = false
  //   },
  //     err=>{
  //       this.loadingReport = false
  //     })
  // }

  refresh(){
    this.getSalesByDate(this.today)
  }

  filterSales(){
    let d = this.filterVal.split('-')
    let newDate = `${d[2]}-${d[1]}-${d[0]}`
    this.getSalesByDate(newDate)
  }

  getSalesByDate(date){
    this.loadingReport = true
    // '28-05-2020'
    this.saleService.getSalesByDate(date).subscribe(data=>{
      this.sales = <any[]>data
      this.loadingReport = false
    },
      err=>{
        this.loadingReport = false
      })
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <any[]>data
    })
  }

  getCustomerName(id){
    try{
    let customer = this.customers.find(x=>x.id == id)
    return `${customer.firstName} ${customer.lastName}`
    }
    catch{
      return `Guest Customer`
    }
  }

  print(id){
    this.format.printDiv(id)
  }

  openInvoice(customerID,invoiceNo){
    console.log(customerID,invoiceNo)
    this.router.navigateByUrl(`/main/invoice/${customerID}/${invoiceNo}`)
  }

}
