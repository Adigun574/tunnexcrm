import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = ''
  password:string = ''
  emptyCredentials:boolean
  invalidCredentials:boolean

  constructor(
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

  login(){
    if(this.username != '' && this.password != ''){
      this.userService.login(this.username,this.password).subscribe(data=>{
        let res = <any>data
        // console.log(res)
        this.userService.getSingleUser(res.id).subscribe(data2=>{
          let response = <any>data2
          if(response.role && response.role.privileges){
            let privileges = response.role.privileges
            localStorage.setItem("tunnexcrmuserpriivileges",JSON.stringify(privileges))
            this.router.navigateByUrl('main')
          }
          else{
            let privileges = []
            localStorage.setItem("tunnexcrmuserpriivileges",JSON.stringify(privileges))
            this.router.navigateByUrl('main')
          }
        },
          err2=>{
            let privileges = []
            localStorage.setItem("tunnexcrmuserpriivileges",JSON.stringify(privileges))
            this.router.navigateByUrl('main')
          })            
            localStorage.setItem("tunnexcrmuser",JSON.stringify(data))
            // this.router.navigateByUrl('main')
            this.invalidCredentials = false
          },
        err=>{
          this.invalidCredentials = true
        })
    }
    else{
      this.emptyCredentials=true
    }

    // this.router.navigateByUrl('main')
  }

}
