import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SkillService } from '../../../services/skill.service';
import { date } from '../../../classes/date';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId:number
  employees:any[]
  selectedEmployee:any
  editEmployeeDetailsForm:FormGroup
  currentJustify:any
  qualificationForm:FormGroup
  loadingDetails:boolean = true
  savingQualification:boolean = false
  updatingEmployee:boolean = false
  deletingEmployee:boolean = false
  staffSkills = []
  skills = []
  selectedStaffSkill:any
  sas:number
  invalidGrade:boolean = false
  grading:boolean = false
  loadedSkills:boolean = false




  constructor(
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private skillService:SkillService,
    private router:Router,
    private modalService:NgbModal
  ) { 
    this.employeeId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.getSingleEmployee()
    this.getStaffSkillbyStaffID()
    this.getStaffSkills()
  }

  open(content){
    this.modalService.open(content, {centered:true})
  }

  setForms(){
    this.editEmployeeDetailsForm = this.fb.group({
      firstName:[this.selectedEmployee.firstName],
      lastName:[this.selectedEmployee.lastName],
      phone:[this.selectedEmployee.phone],
      email:[this.selectedEmployee.email],
      address:[this.selectedEmployee.address],
      // position:[this.selectedEmployee.position],
      hel:[this.selectedEmployee.hel],
      qualifications:[this.selectedEmployee.qualifications],
      id:[this.selectedEmployee.id]
    })
    this.qualificationForm = this.fb.group({
      id: 0,
      name: [],
      status: [true],
      startDate: [],
      endDate: [],
      staffID: [+this.employeeId]
    })
  }

  getSingleEmployee(){
    this.loadingDetails = true
    this.skillService.getSingleStaff(this.employeeId).subscribe(data=>{
      this.selectedEmployee = <any>data
      this.setForms()
      this.loadingDetails = false
    },
      err=>{})
  }

  updateStaff(){
    this.updatingEmployee = true
    // console.log(this.editEmployeeDetailsForm.value)
    // this.skillService.updateStaff(this.editEmployeeDetailsForm.value).subscribe(data=>{
    //   this.updatingEmployee = false
    // },
    //   err=>{
    //     this.updatingEmployee = false
    //   })
    delete this.selectedEmployee.userCreated
    delete this.selectedEmployee.userModified
    this.selectedEmployee.image = ''
    console.log(JSON.stringify(this.selectedEmployee))
    this.skillService.updateStaff(this.selectedEmployee).subscribe(data=>{
      this.updatingEmployee = false
    },
      err=>{
        this.updatingEmployee = false
      })
  }

  saveQualification(){
    this.savingQualification = true
    this.qualificationForm.value.startDate = `${this.qualificationForm.value.startDate}T11:53:50.102Z`
    this.qualificationForm.value.endDate = `${this.qualificationForm.value.endDate}T11:53:50.102Z`
    // console.log(this.qualificationForm.value)
    this.skillService.saveQualification(this.qualificationForm.value).subscribe(data=>{
      this.savingQualification = false
      this.getSingleEmployee()
    },
      err=>{
        this.savingQualification = false
      })
  }   

  deleteStaff(){
    this.deletingEmployee = true
    this.skillService.deleteEmployee(this.employeeId).subscribe(data=>{
      console.log(data)
      this.deletingEmployee = false
      this.router.navigateByUrl('main/employees')
    },
      err=>{
        console.log(err)
        this.deletingEmployee = false
      })
  }

  getStaffSkills(){
    this.skillService.getAllSkills().subscribe(data=>{
      this.skills = <any[]>data
      this.loadedSkills = true
    },
      err=>{

      })
  }

  getStaffSkillbyStaffID(){
    this.skillService.getStaffSkillByStaffID(this.employeeId).subscribe(data=>{
      console.log(data)
      this.staffSkills = <any[]>data
    },
      err=>{

      })
  }

  getSkillName(id){
    if(id==0){
      return `null`
    }
    else{
      let skill = this.skills.find(x=>x.id == id)
      return `${skill.name}`
    }
  }

  selectStaffSkill(staffSkill){
    this.selectedStaffSkill = staffSkill
  }

  assess(){
    if(this.sas<0 || this.sas>5 || !this.sas){
      this.invalidGrade = true
      return
    }
    else{
      this.invalidGrade = false
      this.grading = true
      this.selectedStaffSkill.assessments.push({
        sas:this.sas,
        staffSkillID:this.selectedStaffSkill.skillID
      })
      this.skillService.upDateStaffSkill(this.selectedStaffSkill).subscribe(data=>{
        this.getStaffSkillbyStaffID()
        this.grading = false
        this.modalService.dismissAll()
        this.selectedStaffSkill.assessments = []
      },
        err=>{
          this.grading = false
          this.modalService.dismissAll()
          this.selectedStaffSkill.assessments = []
        })
    }
  }



}
