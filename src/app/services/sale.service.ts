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

  getSalesHistoryByCustomerStarDateEndDate(customerID,startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Sale/GetSalesReportByDate/${startDate}/${endDate}?customerID=${customerID}`)
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

  saveQuotation(obj){
    return this.httpClient.post(`${this.generalService.api}Quotation/CreateQuotation`,obj)
  }

  getWaybill(startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Sale/GetWaybillByDate/${startDate}/${endDate}`)
  }

  getFreeSales(customerID,startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Payment/GetFreePayments?customerID=${customerID}&sDate=${startDate}&eDate=${endDate}`)
  }

  saveProformaInvoice(obj){
    return this.httpClient.post(`${this.generalService.api}Invoice/CreateProformaInvoice`,obj)
  }

  savePurchaeOrder(obj){
    return this.httpClient.post(`${this.generalService.api}Purchase/SavePurchase`,obj)
  }

  getProformaInvoiceByCustomerStarDateEndDate(customerID,startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Invoice/GetProforma/${startDate}/${endDate}?customerID=${customerID}`)
  }

  getPurchaseOrderBySupplierStartDateandEndDate(supplierID,startDate,endDate){
    return this.httpClient.get(`${this.generalService.api}Purchase/GetPurchasedByDate/${startDate}/${endDate}?supplierID=${supplierID}`)
  }

  deleteSale(invoiceNo){
    return this.httpClient.post(`${this.generalService.api}Sale/DeleteSale/${invoiceNo}`,null)
  }

  deleteFOCPayment(invoiceNo){
    return this.httpClient.post(`${this.generalService.api}Payment/DeleteFOCPayment/${invoiceNo}`,null)
  }

  salesRefund(obj){
    return this.httpClient.post(`${this.generalService.api}Sale/ReturnProduct`,obj)
  }

  getSalesWithInvoiceNo(invoiceNo){
    return this.httpClient.get(`${this.generalService.api}Sale/GetSalewithInvoiceNo/${invoiceNo}`)
  }
}
