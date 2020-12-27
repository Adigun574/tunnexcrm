import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  staffSkills = []
  staff = []
  selectedStaffSkill:any
  skills = []
  sas:number
  grading:boolean = false
  loading:boolean = false
  loadedStaff:boolean = false
  loadedSkills:boolean = false
  invalidGrade:boolean = false

  selectedStaffSkillToGrade

  constructor(
    private skillService:SkillService,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.getAllStaffSkill()
    this.getStaffs()
    this.getStaffSkills()
  }

  open(content){
    this.modalService.open(content)
  }

  getAllStaffSkill(){
    this.loading = true
    // this.skillService.getAllStaffSKil().subscribe(data=>{
    this.skillService.getAllStaffBySkill().subscribe(data=>{
      // console.log(data)
      this.staffSkills = <any[]>data
      this.staffSkills.forEach(skill=>{
        if(!skill.allSkillsOrKpis){
          skill.allSkillsOrKpis = []
        }
      })
      this.loading = false
    },
      err=>{
        this.loading = false
      })
  }

  getStaffs(){
    this.skillService.getAllEmployees().subscribe(data=>{
      // console.log(data)
      this.staff = <any[]>data
      this.loadedStaff = true
    },
      err=>{
        
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


  getStaffName(id){
    if(id == 0){
      return `null`
    }
    else{
      let staff = this.staff.find(x=>x.id == id)
      return `${staff.firstName} ${staff.lastName}`
    }
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
        // staffSkillID:this.selectedStaffSkill.skillID,
        staffSkillorKPIID:this.selectedStaffSkill.skillorKPIID
      })
      // console.log(this.selectedStaffSkill)
      // console.log(JSON.stringify(this.selectedStaffSkill))
      this.skillService.upDateStaffSkill(this.selectedStaffSkill).subscribe(data=>{
        this.getAllStaffSkill()
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
