import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private generalService:GeneralService,
    private httpClient:HttpClient
  ) { }

  saveSupplier(obj){
    return this.httpClient.post(`${this.generalService.api}Supplier/SaveSupplier`,obj)
  }

  bulkSaveSupplier(obj){
    return this.httpClient.post(`${this.generalService.api}Supplier/SaveMultipleSuppliers`,obj)
  }

  updateSupplier(obj){
    return this.httpClient.post(`${this.generalService.api}Supplier/UpdateSupplier`,obj)
  }

  getSupplierByID(id){
    return this.httpClient.get(`${this.generalService.api}Supplier/GetSupplierByID/${id}`)
  }

  getAllSuppliers(){
    return this.httpClient.get(`${this.generalService.api}Supplier/GetAllSuppliers`)
  }

  deleteSupplier(id){
    return this.httpClient.post(`${this.generalService.api}Supplier/DeleteSupplier/${id}`,null)
  }
}
