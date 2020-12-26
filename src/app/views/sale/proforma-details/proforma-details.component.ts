import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Customer } from '../../../models/customer';
import { Formats } from '../../../classes/print';
import { ActivatedRoute, Router } from '@angular/router';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

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
    private userService:UserService,
    private modalService:NgbModal,
    private router:Router
  ) { 
    this.invoiceID = +this.route.snapshot.params.id
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getCustomers()
    this.getSalesByCustStartandEndDate(0,0,0)
    this.getUsers()
  }

  open(content){
    this.modalService.open(content,{centered:true})
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

  discountStuff = 0
  lpo = ''
  deliveryFee = 0
  delivery = false
  saving:boolean = false

  completeSale(){
    this.saving = true
    let obj = {
      customerID:this.invoice.customerID,
      quotProducts:[],
      id:0
    }
    this.invoice.cart.items.forEach(item=>{
      obj.quotProducts.push({
        id:0,
        quotationID:this.invoice.id,
        productID:item.productID,
        quantity:item.quantity
      })
    })
    // console.log(JSON.stringify(obj))
    // console.log(obj,this.discountStuff,this.lpo,this.deliveryFee,this.delivery)
    this.saleService.convertQuotationToSale(obj,this.lpo,this.delivery,this.deliveryFee,this.discountStuff).subscribe(data=>{
      this.saving = false
      this.modalService.dismissAll()
      // console.log(data)
      Swal.fire(
        'Success',
        'Sale Completed',
        'success'
      ).then((result) => {
        this.router.navigateByUrl('/main/pos')
      })
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
