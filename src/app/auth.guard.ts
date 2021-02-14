import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  privileges

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.privileges = JSON.parse(localStorage.getItem("tunnexcrmuserpriivileges"))
      let currentPrivilege = this.privileges.find(x=>x.name.toLowerCase() == next.data.title.toLowerCase())
      if(!currentPrivilege){
        return true
      }
      else{
        if(currentPrivilege.write){
          return true
        }
        else{
          return false
        }
      }

      // return true
      
    

    // this.privilege = JSON.parse(localStorage.getItem("tunnexcrmuserpriivileges"))
    // let privileges = this.privilege.find(x => {
    //   console.log(x.name)
    //   console.log(next.data.title)
    //   // return x.name == next.data.title;
    // });
    
    // if (this.currentUser.role.name == 'Super Admin') {
    //   return true;
    // } else if (this.privilege.read == true) {
    //   return true;
    // } else {
    //   return false;
    // }

  }
  
}
