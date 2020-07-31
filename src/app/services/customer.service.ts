import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private generalService:GeneralService,
    private httpClient:HttpClient
  ) { }
  
  saveCustomer(obj){
    return this.httpClient.post(`${this.generalService.api}Customer/SaveCustomer`,obj)
  }

  getAllCustomers(){
    return this.httpClient.get(`${this.generalService.api}Customer/GetAllCustomers`)
  }

  updateCustomer(obj){
    return this.httpClient.post(`${this.generalService.api}Customer/UpdateCustomer`,obj)
  }

  getSingleCustomer(id){
    return this.httpClient.get(`${this.generalService.api}Customer/GetCustomerByID/${id}`)
  }

  getTopCustomers(){
    return this.httpClient.get(`${this.generalService.api}Customer/MostFrequentCustomers`)
  }

  deleteCustomer(id){
    return this.httpClient.post(`${this.generalService.api}Customer/DeleteCustomer/${id}`,null)
  }

  saveCustomerMessage(obj){
    return this.httpClient.post(`${this.generalService.api}CustomerMessage/SaveCustomerMessage`,obj)
  }

  saveMultipleCustomers(obj){
    return this.httpClient.post(`${this.generalService.api}Customer/SaveMultipleCustomers`,obj)
  }
}

