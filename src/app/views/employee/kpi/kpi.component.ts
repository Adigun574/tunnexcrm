import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from '../../../services/skill.service';
import { User } from '../../../models/user';
import { date } from '../../../classes/date';


@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css']
})
export class KpiComponent implements OnInit {

  addProgramForm:FormGroup
  programs:any[]
  employees:any[]
  saving:boolean = false
  loadingSkills:boolean = false
  selectedEmployee
  sas
  selectedSkill
  skillToUpdate
  updatingSkill:boolean = false
  currentUser:User
  addingStaffSkill:boolean = false
  invalidDetails:boolean = false

  deleting:boolean = false


  constructor(
    private fb:FormBuilder,
    private modalService:NgbModal,
    private skillService:SkillService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.addProgramForm = this.fb.group({
      name:['',Validators.required],
      // duration:[],
      description:[''],
      type:['kpi'],
      id: [0],
      userCreated: [this.currentUser.id],
      userModified: [0],
      dateCreated: [date()],
      dateModified: [date()]

    })
   }

  ngOnInit(): void {
    this.getSkills()
    this.getAllEmployees()
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
    },
    err=>{})
  }

  saveProgram(){
    if(this.addProgramForm.invalid){
      return
    }
    else{
      this.saving = true
      console.log(this.addProgramForm.value)
      this.skillService.saveSkill(this.addProgramForm.value).subscribe(data=>{
        this.saving = false
        this.getSkills()
        this.modalService.dismissAll()
      },
        err=>{
          this.saving = false
          this.modalService.dismissAll()
        })
      
    }
  }

  getSkills(){
    this.loadingSkills = true
    this.skillService.getAllKpi().subscribe(data=>{
      this.programs = <any[]>data
      this.loadingSkills = false
    },
      err=>{
        this.loadingSkills = false
      })
  }

  getAllEmployees(){
    this.skillService.getAllEmployees().subscribe(data=>{
      this.employees = <any[]>data
    },
      err=>{
        
      })
  }

  selectSkill(skill){
    this.selectedSkill = skill
    console.log(this.selectedSkill)
  }

  addStaffSkill(){
    // if(!this.selectedSkill || !this.selectedEmployee || this.sas>5 || !this.sas || this.sas<0){
    if(!this.selectedSkill || !this.selectedEmployee){    
      console.log('invalid stuffs')
      this.invalidDetails = true
      return
    }
    else{
      this.invalidDetails = false
      this.addingStaffSkill = true
      let obj = {
        id: 0,
        staffID: this.selectedEmployee.id,
        skillorKPIID:this.selectedSkill.id,
        // skillID: this.selectedSkill.id,
        assessments: [],
        supervisorID: this.currentUser.id,
        competencyValue: 0
      }
      console.log(obj)
      this.skillService.saveStaffSkill(obj).subscribe(data=>{
        this.addingStaffSkill = false
        this.modalService.dismissAll()
        console.log(data)
      },
        err=>{
          this.addingStaffSkill = false
          this.modalService.dismissAll()
          console.log(err)
        })
    }    
  }

  selectSkillToUpdate(skill){
    this.skillToUpdate = skill
  }

  updateSkill(){
    this.updatingSkill = true
    this.skillService.updateSkill(this.skillToUpdate).subscribe(data=>{
      this.updatingSkill = false
      this.modalService.dismissAll()
    },
      err=>{
        this.updatingSkill = false
        this.modalService.dismissAll()
      })
  }

  deleteSkill(id){
    this.deleting = true
    this.skillService.deleteSkillorKpi(id).subscribe(data=>{
      this.getSkills()
      this.deleting = false
    },
    err=>{
      this.deleting = false
    }
    )
  }



}
