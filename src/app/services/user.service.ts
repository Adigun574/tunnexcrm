import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
    private generalService:GeneralService
  ) { }

  getUsers(){
    return this.httpClient.get(`${this.generalService.api}User/GetAllUsers`)
  }

  saveUser(obj){
    return this.httpClient.post(`${this.generalService.api}User/SaveUser`,obj)
  }

  updateUser(obj){
    return this.httpClient.post(`${this.generalService.api}User/UpdateUser`,obj)
  }

  login(username,password){
    return this.httpClient.post(`${this.generalService.api}User/Authenticate?username=${username}&password=${password}`,null)
  }

  deleteUser(id){
    return this.httpClient.post(`${this.generalService.api}User/DeleteUser/${id}`,null)
  }

  getSingleUser(id){
    return this.httpClient.get(`${this.generalService.api}User/GetUserByID/${id}`)
  }
}
