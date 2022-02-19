import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sale } from '../../../../models/sales';
import { SaleService } from '../../../../services/sale.service';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

sales:Sale[]
totalAmount
totalBalance
totalPaid
customerID

   constructor(
    private route:ActivatedRoute,
    private router:Router,
    private saleService:SaleService
  ) { 
    this.customerID = +this.route.snapshot.params.customerID
  }


  ngOnInit(): void {
    this.totalAmount=0
    this.totalBalance=0
    this.totalPaid=0
    this.getSalesByCustStartandEndDate(this.customerID,0,0);
  }

  getSalesByCustStartandEndDate(customerID,startDate,endDate){
    //this.loadingReport = true
    this.saleService.getSalesHistoryByCustomerStarDateEndDate(customerID,startDate,endDate).subscribe(data=>{
      //this.loadingReport = false
      this.sales = <Sale[]>data
      console.log(data);
      for(let i=0;i<this.sales.length-1;i++)
      {
        this.totalAmount+=this.sales[i].invoice.amount;
        this.totalPaid+=this.sales[i].invoice.amountPaid;
        this.totalBalance+=this.sales[i].invoice.balance;
        
      }
      
      // console.log(this.customerID);
      // console.log(this.totalAmount);
      // console.log(this.totalPaid);
      // console.log(this.totalBalance);
    },
      err=>{
        // this.loadingReport = false
        // console.log(err)
      })
  }

}
