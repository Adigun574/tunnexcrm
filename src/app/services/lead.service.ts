import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(
    private generalService:GeneralService,
    private httpClient:HttpClient
  ) { }

  saveLead(obj){
    return this.httpClient.post(`${this.generalService.api}Lead/SaveLead`,obj)
  }

  getAllLeads(){
    return this.httpClient.get(`${this.generalService.api}Lead/GetAllLeads`)
  }

  getLeadByID(id){
    return this.httpClient.get(`${this.generalService.api}Lead/GetLeadByID/${id}`)
  }

  convertLeadToCustomer(id){
    return this.httpClient.post(`${this.generalService.api}Lead/ConvertLeadToCustomer/${id}`,null)
  }

  deleteLead(id){
    return this.httpClient.post(`${this.generalService.api}Lead/DeleteLead/ID?ID=${id}`,null)
  }

  saveMessage(obj){
    return this.httpClient.post(`${this.generalService.api}Message/SaveMessage`,obj)
  }
}
