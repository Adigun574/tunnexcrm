import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
// import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser:User
  privilege

  constructor(
    private router: Router, 
    // private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
    // // const currentUser = this.authService.currentUserValue;
    // const currentUser = null;
    // if (currentUser) {
    //   // logged in so return true
    //   return true;
    // }
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;

    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    // return true;
    // this.privilege = this.currentUser.role.privileges.find(x => {
    //   console.log(x.name)
    //   console.log(next.data.title)
    //   console.log("ssssjj")
    //   return x.name == next.data.title;
    // });
    return true
  }
}
