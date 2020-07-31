import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { User } from '../../../models/user';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId:number
  currentJustify = 'start'
  customers:any[]
  selectedCustomer:Customer = {
    firstName:null,
    lastName:null,
    address:null,
    phone:null,
    email:null
  }
  editCustomerDetailsForm:FormGroup
  products:any[]
  updatingCustomer:boolean = false
  deletingCustomer:boolean = false
  savingCustomerMessage:boolean = false
  customerMessage = ''
  currentUser:User



  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private customerService:CustomerService,
    private router:Router
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.customerId = this.route.snapshot.params.id
    this.getSingleCustomer()
  }

  ngOnInit() {
    this.getCustomerSalesRecord()
  }

  

  getSingleCustomer(){
    this.customerService.getSingleCustomer(this.customerId).subscribe(data=>{
      this.selectedCustomer = <Customer>data
    },
      err=>{

      })
  }

  updateCustomer(){
    this.updatingCustomer = true
    this.customerService.updateCustomer(this.selectedCustomer).subscribe(data=>{
      this.router.navigateByUrl('/main/customers')
    },
      err=>{
        this.updatingCustomer = false
      })
  }

  deleteCustomer(id){
    this.deletingCustomer = true
    this.customerService.deleteCustomer(id).subscribe(data=>{
      console.log(data)
      this.deletingCustomer = false
      this.router.navigateByUrl('/main/customers')
    },
      err=>{
        console.log(err)
        this.deletingCustomer = false
      })
  }

  addMessage(){
    this.savingCustomerMessage = true
    let convoObj= {
      type: "",
      summary: this.customerMessage,
      customerID: +this.customerId,
      attachment: "",
      id: 0,
      userCreated: this.currentUser.id,
      userModified: 0,
    }
    this.customerService.saveCustomerMessage(convoObj).subscribe(data=>{
      this.getSingleCustomer()
      this.savingCustomerMessage = false
      this.customerMessage = ''
    },
      err=>{
        this.savingCustomerMessage = false
        this.customerMessage = ''
      })
  }

  


  getCustomerSalesRecord(){
    this.products = [
      {
        productName:'product1',
        quantity:10,
        totalPrice:10000,
        date:'02/02/19'
      },
      {
        productName:'product2',
        quantity:15,
        totalPrice:12000,
        date:'02/02/19'
      },
      {
        productName:'product3',
        quantity:2,
        totalPrice:5000,
        date:'02/02/19'
      },
      {
        productName:'product4',
        quantity:20,
        totalPrice:13500,
        date:'02/02/19'
      },
    ]
  }

}
