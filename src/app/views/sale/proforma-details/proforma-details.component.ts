import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Customer } from '../../../models/customer';
import { Formats } from '../../../classes/print';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';

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
  users = []



  constructor(
    private route:ActivatedRoute,
    private saleService:SaleService,
    private customerService:CustomerService,
    private userService:UserService
  ) { 
    this.invoiceID = +this.route.snapshot.params.id
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getCustomers()
    this.getSalesByCustStartandEndDate(0,0,0)
    this.getUsers()
  }

  getSalesByCustStartandEndDate(customerID,startDate,endDate){
    this.loading = true
    this.saleService.getProformaInvoiceByCustomerStarDateEndDate(customerID,startDate,endDate).subscribe(data=>{
      this.loading = false
      // console.log(data)
      this.invoices = <any[]>data
      this.invoice = this.invoices.find(x=>x.id == this.invoiceID)
      // console.log(this.invoice)
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

  getUsers(){
    this.userService.getUsers().subscribe(data=>{
      // console.log(data)
      this.users = <any[]>data
    },
    err=>{
      console.log(err)
    })
  }

  getUserName(id){
    let user = this.users.find(x=>x.id == id)
    if(!user){
      user = this.users[0]
    }
    return `${user.name}`
  }

  print(){
    this.format.printDiv('toPrint')
  }

}
