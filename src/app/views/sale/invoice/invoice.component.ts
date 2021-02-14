import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { Formats } from '../../../classes/print';
import { UserService } from '../../../services/user.service';


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
  format  = new Formats()
  users:User[] = []
  methods = [
    {name:'cash'},
    {name:'transfer'},
    {name:'cheque'},
    {name:'pos'}
  ]
  paymentMode
  reference
  salesObj
  loadingSalesObj:boolean = false



  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private saleService:SaleService,
    private modalService:NgbModal,
    private customerService:CustomerService,
    private userService:UserService
  ) { 
    this.customerID = +this.route.snapshot.params.customerID
    this.invoiceNo = this.route.snapshot.params.invoiceNo
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getInvoice()
    this.getCustomers()
    this.getUsers()
    this.getSalesObj()
  }

  getInvoice(){
    this.saleService.getInvoiceByCIDandInvoiceNo(this.invoiceNo,this.customerID).subscribe(data=>{
      this.invoice = data
      // console.log(this.invoice)
      this.loading = false
    },
      err=>{
        this.loading = false
      })
  }

  getSalesObj(){
    this.loadingSalesObj = true
    this.saleService.getSalesWithInvoiceNo(this.invoiceNo).subscribe(data=>{
      this.salesObj = <any>data
      this.salesObj.payment.forEach((pay,i)=>{
        if(pay.amount == 0){
          this.salesObj.payment.splice(i,1)
        }
      })
      this.loadingSalesObj = false
      // console.log(data)
    },
      err=>{
        this.loadingSalesObj = false
        console.log(err)
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
        method: this.paymentMode || 'cash',
        reference: this.reference || '',
        invoiceNo: this.invoice.invoiceNo,
        userCreated: this.currentUser.id
      }
      this.saleService.makePayment(obj).subscribe(data=>{
        this.paying = false
        this.modalService.dismissAll()
        this.getInvoice()
        this.getSalesObj()
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
    if(!cust){
      return `Guest Customer`
    }
    return `${cust.firstName} ${cust.lastName}`
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




}
