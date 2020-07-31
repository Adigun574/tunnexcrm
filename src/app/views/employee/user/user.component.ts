import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { User } from '../../../models/user';
import { date } from '../../../classes/date';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {

  users = []
  addUserForm:FormGroup
  genders=[
    {name:'male'},
    {name:'female'},
    {name:'not specified'}
  ]
  submitted:boolean = false
  savingUser:boolean = false
  selectedUser:any
  updatingUser:boolean = false
  loadingUsers:boolean = false
  currentUser:User
  roles:any[]
  selectedRole:any
  cannotAddUser:boolean = true


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Role>(this.users);  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private modalService:NgbModal,
    private userService:UserService,
    private fb:FormBuilder,
    private roleService:RoleService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.addUserForm = this.fb.group({
      username:[,Validators.required],
      name: [,Validators.required],
      post: [],
      phone: [],
      password: [],
      gender: ["male"],
      image: [],
      email: [],
      id: 0,
      userCreated: this.currentUser.id,
      userModified: 0,
      role:[],
      roleID:[]
      // DateCreated: [date()],
      // DateModified: [date()]
    })
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllUsers()
    this.getAllRoles()
  }

  open(content){
    this.modalService.open(content)
  }

  openEditModal(editModal,user){
    this.selectedUser = user
    this.open(editModal)
  }

  getAllUsers(){
    this.loadingUsers = true
    this.userService.getUsers().subscribe(data=>{
      this.users = <any[]>data
      // console.log(this.users)
      this.dataSource = new MatTableDataSource<Role>(this.users);
      this.loadingUsers = false
      if(this.users.length >= 3){
        this.cannotAddUser = true
      }
      else{
        this.cannotAddUser = false
      }
    },
      err=>{
        this.loadingUsers = false
      })
  }

  saveUser(){
    this.submitted = true
    if(this.addUserForm.invalid){
      return
    }
    else{
      if(this.selectedRole){
        // this.addUserForm.value.role = this.selectedRole
        this.addUserForm.value.roleID = this.selectedRole.id
      }
      // console.log(this.addUserForm.value)
      this.savingUser = true
      this.userService.saveUser(this.addUserForm.value).subscribe(data=>{
        this.savingUser = false
        this.getAllUsers()
        this.modalService.dismissAll()
      },
        err=>{
          this.savingUser = false
          this.modalService.dismissAll()
        })
    }

  }

  updateUser(){
    this.updatingUser = true
    this.userService.updateUser(this.selectedUser).subscribe(data=>{
      this.updatingUser = false
      this.modalService.dismissAll()
      this.getAllUsers()
    },
      err=>{
        this.updatingUser = false
        this.modalService.dismissAll()
      })
  }

  deleteUser(user){
    this.userService.deleteUser(user.id).subscribe(data=>{
      console.log(data)
      this.getAllUsers()
    },
    err=>{
      console.log(err)
    })
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe(data=>{
      this.roles = <Role[]>data
      // console.log(this.roles)
    },
      err=>{
      })
  }

  selectRole(e){
    this.selectedRole = e
  }

}
