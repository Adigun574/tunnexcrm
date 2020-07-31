import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../services/sale.service';
import { CustomerService } from '../../../services/customer.service';
import { ProductService } from '../../../services/product.service';
import { LeadService } from '../../../services/lead.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  sales = []
  customers = []
  products = []
  leads = []

  constructor(
    private saleService:SaleService,
    private customerService:CustomerService,
    private productService:ProductService,
    private leadService:LeadService
  ) { }

  ngOnInit(): void {
    this.getAllSales()
    this.getAllCustomers()
    this.getAllProducts()
    this.getAllLeads()
  }

  getAllSales(){
    this.saleService.getAllSales().subscribe(data=>{
      this.sales = <any[]>data
    },
      err=>{})
  }

  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = <any[]>data
    },
      err=>{})
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = <any[]>data
    },
      err=>{})
  }

  getAllLeads(){
    this.leadService.getAllLeads().subscribe(data=>{
      this.leads = <any[]>data
    })
  }

}
