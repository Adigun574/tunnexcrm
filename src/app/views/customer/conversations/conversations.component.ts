import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from '../../../services/lead.service';
import { Lead } from '../../../models/lead';
import { User } from '../../../models/user';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  leadId:number
  lead:Lead
  loading:boolean = false
  savingLeadMessage:boolean = false
  leadMessage = ''
  currentUser:User



  constructor(
    private route:ActivatedRoute,
    private leadService:LeadService
  ) { 
    this.leadId = +this.route.snapshot.paramMap.get('id')
    this.currentUser = JSON.parse(localStorage.getItem("tunnexcrmuser"))
  }

  ngOnInit(): void {
    this.getLeadById()
  }

  getLeadById(){
    this.loading = true
    this.leadService.getLeadByID(this.leadId).subscribe(data=>{
      this.lead = <Lead>data
      this.loading = false
    },
      err=>{
        this.loading = false
      })
  }

  addMessage(){
    this.savingLeadMessage = true
    let convoObj= {
      type: "",
      summary: this.leadMessage,
      leadID: this.leadId,
      attachment: "",
      id: 0,
      userCreated: this.currentUser.id,
      userModified: 0,
    }
    this.leadService.saveMessage(convoObj).subscribe(data=>{
      this.getLeadById()
      this.savingLeadMessage = false
      this.leadMessage = ''
    },
      err=>{
        this.savingLeadMessage = false
        this.leadMessage = ''
      })
  }

}
