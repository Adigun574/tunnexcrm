import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../../services/skill.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kpi-details',
  templateUrl: './kpi-details.component.html',
  styleUrls: ['./kpi-details.component.css']
})
export class KpiDetailsComponent implements OnInit {

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

  startDate = null
  endDate = null

  constructor(
    private skillService:SkillService,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    // this.getAllStaffSkill()
    this.getStaffs()
    this.getStaffSkills()
  }

  open(content){
    this.modalService.open(content)
  }

  getAllStaffSkill(){
    this.loading = true
    this.skillService.getAllStaffByKpi().subscribe(data=>{
      // console.log(data)
      this.staffSkills = <any[]>data
      this.staffSkills.forEach((skill,i)=>{
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
      this.getStaffSkillByDates(0,0)
    },
      err=>{
        
      })
  }

  getStaffSkills(){
    this.skillService.getAllKpi().subscribe(data=>{
      this.skills = <any[]>data
      this.loadedSkills = true
      // console.log(this.skills)
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
        // staffSkillID:this.selectedStaffSkill.skillID
        staffSkillorKPIID:this.selectedStaffSkill.skillorKPIID
      })
      this.skillService.upDateStaffSkill(this.selectedStaffSkill).subscribe(data=>{
        // this.getAllStaffSkill()
        this.getStaffSkillByDates(0,0)
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


  /////

  getStaffSkillByDates(startDate,endDate){
    this.loading = true
    // console.log({startDate,endDate})
    this.skillService.getAllStaffKPIByStartDateAndEndDate(startDate, endDate).subscribe(data=>{
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
        console.log(err)
      })
  }

  filter(){
    let a = this.startDate.split('-')
    let newStartDate = `${a[2]}-${a[1]}-${a[0]}`
    let b = this.endDate.split('-')
    let newEndDate = `${b[2]}-${b[1]}-${b[0]}`
    // console.log(newStartDate, newEndDate)
    this.getStaffSkillByDates(newStartDate, newEndDate)
  }

  reset(){
    this.getStaffSkillByDates(0,0)
  }

  toFixed(a){
    return a.toFixed(2)
  }


}
