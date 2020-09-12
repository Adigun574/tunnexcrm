import { Component, OnInit } from '@angular/core';
import { Formats } from '../../../classes/print';
import { Customer } from '../../../models/customer';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-free-products',
  templateUrl: './free-products.component.html',
  styleUrls: ['./free-products.component.css']
})
export class FreeProductsComponent implements OnInit {

  debtorsReport = []
  loadingReport:boolean = true
  customers:Customer[] = []
  startDate = '0'
  endDate = '0'
  format = new Formats()
  customerFilterMode:boolean = false
  debtorsReportByCustomer = []
  selectedCustomer:Customer

  constructor(
    private saleService:SaleService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
    this.getFreeSales(0,0,0)
  }

  getFreeSales(customerID,startDate,endDate){
    this.loadingReport = true
    this.saleService.getFreeSales(customerID,startDate,endDate).subscribe(data=>{
      this.debtorsReport = <any[]>data
      this.debtorsReportByCustomer = this.debtorsReport
      // console.log(this.debtorsReport)
      this.loadingReport = false
      this.getCustomers()
    },
      err=>{
        this.loadingReport = false
      })
  }

  filterReport(){
    let startDate = this.startDate.split('-')
    let endDate = this.endDate.split('-')
    let finalStartDate = `${startDate[2]}-${startDate[1]}-${startDate[0]}`
    let finalEndDate = `${endDate[2]}-${endDate[1]}-${endDate[0]}`
    this.getFreeSales(0,finalStartDate,finalEndDate)
  }

  filterReportByCutomer(e){
    this.customerFilterMode = true
    // console.log(e)
    this.debtorsReportByCustomer = this.debtorsReport.filter(x=>x.customerID == e.id)
  }

  reset(){
    this.getFreeSales(0,0,0)
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <Customer[]>data
      this.customers.forEach(cust=>{
        cust.fullName = `${cust.firstName} ${cust.lastName}`
      })
      // console.log(this.customers)
      this.loadingReport = false
    },
      err=>{

      })
  }

  getCustomerName(id){
    if(!id || id==0){
      return `Guest Customer`
    }
    let cust = this.customers.find(x=>x.id == id)
    return `${cust.firstName} ${cust.lastName}`
  }

  print(){
    this.format.printDiv('toPrint')
  }

  cancelFoc(invoiceNo){
    this.saleService.deleteFOCPayment(invoiceNo).subscribe(data=>{
      this.getFreeSales(0,0,0)
    },
      err=>{
      })
  }


}
