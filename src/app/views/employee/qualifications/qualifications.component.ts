import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {

  loading:boolean = false
  filteredLeads = []

  constructor(
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(content){
    this.modalService.open(content,{centered:true})
  }

}
