import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private httpClient:HttpClient,
    private generalService:GeneralService
  ) { }

  saveSale(obj){
    return this.httpClient.post(`${this.generalService.api}Sale/SaveSale`,obj)
  }

  getAllSales(){
    return this.httpClient.get(`${this.generalService.api}Sale/GetAllSales`)
  }

  getSalesByDate(date){
    return this.httpClient.get(`${this.generalService.api}Sale/GetSingleDaySales/${date}`)
  }

  getInvoiceByCIDandInvoiceNo(invoiceNo,cID){
    return this.httpClient.get(`${this.generalService.api}Invoice/GetInvoice/${invoiceNo}/${cID}`)
  }

  makePayment(obj){
    return this.httpClient.post(`${this.generalService.api}Payment/MakePayment`,obj)
  }

  getDebtorsReport(startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Invoice/GetDebtorsList/${startDate}/${endDate}`)
  }
}
