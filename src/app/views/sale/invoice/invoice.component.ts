import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  customerID
  invoiceNo
  invoice
  loading:boolean = true
  amount
  currentUser:User
  paying:boolean = false
  customers:Customer[] = []
  fetchingCustomers:boolean = true


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private saleService:SaleService,
    private modalService:NgbModal,
    private customerService:CustomerService
  ) { 
    this.customerID = +this.route.snapshot.params.customerID
    this.invoiceNo = this.route.snapshot.params.invoiceNo
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getInvoice()
    this.getCustomers()
  }

  getInvoice(){
    this.saleService.getInvoiceByCIDandInvoiceNo(this.invoiceNo,this.customerID).subscribe(data=>{
      this.invoice = data
      console.log(this.invoice)
      this.loading = false
    },
      err=>{
        this.loading = false
      })
  }

  open(content){
    this.modalService.open(content)
  }

  pay(){
    if(this.amount<0 || this.amount>this.invoice.balance){
      return
    }
    else{
      this.paying = true
      let obj = {
        // id: 0,
        customerID: this.invoice.customerID,
        amount: +this.amount,
        method: "cash",
        reference: this.invoice.invoiceNo,
        // datePaid: 2020-06-10T22:27:32.041Z,
        invoiceNo: this.invoice.invoiceNo,
        userCreated: this.currentUser.id
      }
      this.saleService.makePayment(obj).subscribe(data=>{
        this.paying = false
        this.modalService.dismissAll()
        this.getInvoice()
      },
        err=>{
          this.paying = false
          this.modalService.dismissAll()
        })
      }
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
    return `${cust.firstName} ${cust.lastName}`
  }



}
