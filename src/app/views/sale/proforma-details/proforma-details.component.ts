import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Customer } from '../../../models/customer';
import { Formats } from '../../../classes/print';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-proforma-details',
  templateUrl: './proforma-details.component.html',
  styleUrls: ['./proforma-details.component.css']
})
export class ProformaDetailsComponent implements OnInit {

  invoiceID
  invoice
  loading:boolean = true
  amount
  currentUser:User
  paying:boolean = false
  customers:Customer[] = []
  fetchingCustomers:boolean = true
  format  = new Formats()
  invoices



  constructor(
    private route:ActivatedRoute,
    private saleService:SaleService,
    private customerService:CustomerService
  ) { 
    this.invoiceID = +this.route.snapshot.params.id
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getCustomers()
    this.getSalesByCustStartandEndDate(0,0,0)
  }

  getSalesByCustStartandEndDate(customerID,startDate,endDate){
    this.loading = true
    this.saleService.getProformaInvoiceByCustomerStarDateEndDate(customerID,startDate,endDate).subscribe(data=>{
      this.loading = false
      console.log(data)
      this.invoices = <any[]>data
      this.invoice = this.invoices.find(x=>x.id == this.invoiceID)
    },
      err=>{
        this.loading = false
        console.log(err)
      })
  }


  getCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <Customer[]>data
      this.fetchingCustomers = false
    },
      err=>{

      })
  }

  getCustomerName(id){
    let cust = this.customers.find(x=>x.id == id)
    if(!cust){
      return `Guest Customer`
    }
    return `${cust.firstName} ${cust.lastName}`
  }

  print(){
    this.format.printDiv('toPrint')
  }

}
