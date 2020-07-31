import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../models/user';
import { date } from '../../../classes/date';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})


export class RoleComponent implements OnInit {

  roles = []
  roleName:string
  loadingRoles:boolean = false
  currentUser:User
  roleObj:Role
  savingRole:boolean = false


  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Role>(this.roles);  


  // roles:Role[] = []

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private roleService:RoleService,
    private modalService:NgbModal
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.setRoleObj()
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllRoles()
  }

  open(content){
    this.modalService.open(content)
  }

  

  saveRole(){
    this.savingRole = true
    this.roleObj.Name = this.roleName
    // console.log(this.roleObj)
    this.roleService.saveRole(this.roleObj).subscribe(data=>{
      this.savingRole = false
      this.modalService.dismissAll()
      this.getAllRoles()
    },
      err=>{
        this.savingRole = false
        this.modalService.dismissAll()
      })
  }

  getAllRoles(){
    this.loadingRoles = true
    this.roleService.getAllRoles().subscribe(data=>{
      this.roles = <Role[]>data
      this.dataSource = new MatTableDataSource<Role>(this.roles);
      this.loadingRoles = false
    },
      err=>{
        this.loadingRoles = false
      })
  }

  deleteRole(id){
    this.roleService.deleteRole(id).subscribe(data=>{
      // console.log(data)
      this.getAllRoles()
    },
      err=>{
        // console.log(err)
      })
  }

  setRoleObj(){
    this.roleObj = {
      Name: "",
      Code: "",
      Privileges: [
        {
          Name: "customer",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "product",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "role",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "pos",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "employees",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "saleshistory",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "users",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "leads",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "productreports",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "customersreport",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "inventory",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "training programmes",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "skillmonitoring",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        },
        {
          Name: "messages",
          Code: "",
          Read: true,
          Write: true,
          RoleID: 0,
          ID: 0,
          UserCreated: this.currentUser.id,
          UserModified: 0,
          DateCreated: date(),
          DateModified: date()
        }
      ],
      ID: 0,
      UserCreated: this.currentUser.id,
      UserModified: 0,
      DateCreated: date(),
      DateModified: date()
    }
  }

}
