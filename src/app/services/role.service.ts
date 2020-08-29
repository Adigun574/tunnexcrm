import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private httpClient:HttpClient,
    private generalService:GeneralService
  ) { }

  saveRole(obj){
    return this.httpClient.post(`${this.generalService.api}Role/Save`,obj)
  }

  getAllRoles(){
    return this.httpClient.get(`${this.generalService.api}Role/GetAllRoles`)
  }

  getRoleById(id){
    return this.httpClient.get(`${this.generalService.api}Role/GetRoleByID/${id}`)
  }

  deleteRole(id){
    return this.httpClient.post(`${this.generalService.api}Role/DeleteRole/${id}`,null)
  }

  updateRole(obj){
    return this.httpClient.post(`${this.generalService.api}Role/UpdateRole`,obj)
  }
}
