import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';


@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(
    private httpClient:HttpClient,
    private generalService:GeneralService
  ) { }

  saveSkill(obj){
    return this.httpClient.post(`${this.generalService.api}Skill/Save`,obj)
  }

  getAllSkills(){
    return this.httpClient.get(`${this.generalService.api}Skill/GetAllSkills`)
  }

  getAllEmployees(){
    return this.httpClient.get(`${this.generalService.api}Staff/GetAllStaff`)
  }

  saveEmployee(obj){
    return this.httpClient.post(`${this.generalService.api}Staff/Save`,obj)
  }

  saveStaffSkill(obj){
    return this.httpClient.post(`${this.generalService.api}StaffSkill/Save`,obj)
  }

  updateSkill(obj){
    return this.httpClient.post(`${this.generalService.api}Skill/Update`,obj)
  }

  saveQualification(obj){
    return this.httpClient.post(`${this.generalService.api}Qualification/Save`,obj)
  }

  getSingleStaff(id){
    return this.httpClient.get(`${this.generalService.api}Staff/GetStaffByID/${id}`)
  }

  updateStaff(obj){
    return this.httpClient.post(`${this.generalService.api}Staff/Update`,obj)
  }

  deleteEmployee(id){
    return this.httpClient.post(`${this.generalService.api}Staff/DeleteStaff/${id}`,null)
  }

  getAllStaffSKil(){
    return this.httpClient.get(`${this.generalService.api}StaffSkill/GetAllStaffSkill`)
  }

  upDateStaffSkill(obj){
    return this.httpClient.post(`${this.generalService.api}StaffSkill/Update`,obj)
  }

  getStaffSkillByStaffID(id){
    return this.httpClient.get(`${this.generalService.api}StaffSkill/GetStaffSkillsByStaffID/${id}`)
  }

  getAllKpi(){
    return this.httpClient.get(`${this.generalService.api}Skill/GetAllKpis`)
  }

  getAllStaffKpi(){
    return this.httpClient.get(`${this.generalService.api}StaffSkill/GetAllStaffKpi`)
  }

}
