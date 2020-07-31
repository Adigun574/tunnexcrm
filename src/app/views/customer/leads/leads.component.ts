import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../../services/lead.service';
import { Lead } from '../../../models/lead';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { date } from '../../../classes/date';
import { User } from '../../../models/user';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  leads:Lead[]
  isRTL=null
  loading:boolean = false
  addLeadForm:FormGroup
  genders=[
    {name:'male'},
    {name:'female'},
    {name:'not specified'}
  ]
  savingLead:boolean = false
  submitted:boolean = false
  searchKey:string = ''
  filteredLeads:Lead[] = []
  currentUser:User
  selectedLeadID
  leadMessage = ''
  savingLeadMessage:boolean = false

  constructor(
    private leadService:LeadService,
    private modalService:NgbModal,
    private fb:FormBuilder
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
    this.addLeadForm = this.fb.group({
      firstName:[,Validators.required],
      lastName:[,Validators.required],
      email:[''],
      phone:[''],
      address:[''],
      gender:['male'],
      image:[''],
      message:[[]],
      isCustomer:[false],
      company:[''],
      userCreated:[this.currentUser.id],
      userModified:[0],
      // dateCreated:[''],
      // dateModified:['']
    })
  }

  ngOnInit(): void {
    this.getLeads()
  }

  saveLead(){
    this.submitted = true
    if(this.addLeadForm.invalid){
      return
    }
    else{
      this.savingLead = true
      this.leadService.saveLead(this.addLeadForm.value).subscribe(data=>{
        this.getLeads()
        this.savingLead = false
        this.submitted = false
        this.modalService.dismissAll()
      },
        err=>{
          this.submitted = false
          this.savingLead = false
          this.modalService.dismissAll()
        })
    }
  }

  getLeads(){
    this.loading = true
    this.leadService.getAllLeads().subscribe(data=>{
      this.leads = <Lead[]>data
      this.filteredLeads = this.leads
      this.loading = false
      this.filteredLeads.forEach(lead=>{
        if(!lead.firstName){
          lead.firstName = ''
        }
        if(!lead.lastName){
          lead.lastName = ''
        }
      })
    },
      err=>{
      })
  }

  open(content){
    this.modalService.open(content)
  }

  convertToCustomer(id){
    this.leadService.convertLeadToCustomer(id).subscribe(data=>{
      this.getLeads()
    })
  }

  filterLeads(){
    this.filteredLeads = this.leads.filter(x=>x.firstName.toLowerCase().includes(this.searchKey.toLowerCase()) || x.lastName.toLowerCase().includes(this.searchKey.toLowerCase()))
  }

  deleteLead(id){
    this.leadService.deleteLead(id).subscribe(data=>{
      console.log(data)
      this.getLeads()
    },
      err=>{
        console.log(err)
      })
  }

  selectLead(leadID){
    this.selectedLeadID = leadID
  }

  addMessage(){
    this.savingLeadMessage = true
    let convoObj= {
      type: "",
      summary: this.leadMessage,
      leadID: this.selectedLeadID,
      attachment: "",
      id: 0,
      userCreated: this.currentUser.id,
      userModified: 0,
    }
    this.leadService.saveMessage(convoObj).subscribe(data=>{
      this.savingLeadMessage = false
      this.modalService.dismissAll()
    },
      err=>{
        this.savingLeadMessage = false
        this.modalService.dismissAll()
      })
  }
}
