import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { Formats } from '../../../classes/print';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-debtors-report',
  templateUrl: './debtors-report.component.html',
  styleUrls: ['./debtors-report.component.css']
})
export class DebtorsReportComponent implements OnInit {

  debtorsReport = []
  loadingReport:boolean = true
  customers:Customer[] = []
  startDate = '0'
  endDate = '0'
  format = new Formats()
  customerFilterMode:boolean = false
  debtorsReportByCustomer = []

  constructor(
    private saleService:SaleService,
    private customerService:CustomerService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getDebtorsReportMethod(0,0)
  }

  getDebtorsReportMethod(startDate,endDate){
    this.saleService.getDebtorsReport(startDate,endDate).subscribe(data=>{
      this.debtorsReport = <any[]>data
      this.debtorsReportByCustomer = this.debtorsReport
      // console.log(this.debtorsReport)
      // this.loadingReport = false
      this.getCustomers()
    },
      err=>{
        this.loadingReport = false
      })
  }

  openInvoice(customerID,invoiceNo){
    // console.log(customerID,invoiceNo)
    this.router.navigateByUrl(`/main/invoice/${customerID}/${invoiceNo}`)
  }

  filterReport(){
    let startDate = this.startDate.split('-')
    let endDate = this.endDate.split('-')
    let finalStartDate = `${startDate[2]}-${startDate[1]}-${startDate[0]}`
    let finalEndDate = `${endDate[2]}-${endDate[1]}-${endDate[0]}`
    this.getDebtorsReportMethod(finalStartDate,finalEndDate)
  }

  filterReportByCutomer(e){
    this.customerFilterMode = true
    // console.log(e)
    this.debtorsReportByCustomer = this.debtorsReport.filter(x=>x.customerID == e.id)
  }

  reset(){
    this.getDebtorsReportMethod(0,0)
  }

  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <Customer[]>data
      this.customers.forEach(cust=>{
        cust.fullName = `${cust?.firstName} ${cust?.lastName}`
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
    return `${cust?.firstName} ${cust?.lastName}`
  }

  print(){
    this.format.printDiv('toPrint')
  }

}
