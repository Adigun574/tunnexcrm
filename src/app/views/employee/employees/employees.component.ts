import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillService } from '../../../services/skill.service';
import { User } from '../../../models/user';
import { date } from '../../../classes/date';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:any[]
  addEmployeeForm:FormGroup
  qualifications=[
    {name:"SSCE"},
    {name:"OND"},
    {name:"NCE"},
    {name:"HND"},
    {name:"B.Sc"},
    {name:"M.Sc"},
    {name:"PhD"},
    {name:"Others"}
  ]
  genders=[
    {name:'male'},
    {name:'female'},
    {name:'not specified'}
  ]
  loadingEmployees:boolean = false
  savingEmployee:boolean = false
  currentUser:User


  constructor(
    private modalService: NgbModal,
    private fb:FormBuilder,
    private router: Router,
    private skillService: SkillService
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.addEmployeeForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:[],
      email:[''],
      address:[''],
      qualifications:[[]],
      dateofBirth:[],
      gender:['male'],
      hel:[''],
      id: [0],
      userCreated: [this.currentUser.id],
      userModified: [0],
      dateCreated: [date()],
      dateModified: [date()],
      dateEmployed: [''],
      nextofKin:[''],
      nextofKinAddress:[''],
      nextofKinPhone:[''],
      maidenName:[''],
      staffID:[''],
      maritalStatus:[''],
      yearofMarriage:[''],
      designation:[''],
      relationshipToNextofKin:[''],
      middleName:[''],
      secondPhone:[''],
      nin:[''],
      pension:['']
    })
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
    },
    err=>{})
  }

  getEmployees(){
    this.loadingEmployees = true
    this.skillService.getAllEmployees().subscribe(data=>{
      this.employees = <any[]>data
      this.loadingEmployees = false
    },
      err=>{
        this.loadingEmployees = false
      })
  }

  
  saveEmployee(){
    if(this.addEmployeeForm.invalid){
      return
    }
    else{
      // console.log(this.addEmployeeForm.value)
      // console.log(JSON.stringify(this.addEmployeeForm.value))
      this.savingEmployee = true
      this.addEmployeeForm.value.dateofBirth = `${this.addEmployeeForm.value.dateofBirth}T21:44:52.321`
      this.skillService.saveEmployee(this.addEmployeeForm.value).subscribe(data=>{
        this.getEmployees()
        this.savingEmployee = false
        this.modalService.dismissAll()
      },
        err=>{
          this.savingEmployee = false
          this.modalService.dismissAll()
        })
    }
  }

  showEmployee(id){
    this.router.navigateByUrl(`main/employee/${id}`)
  }

}
