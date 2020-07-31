import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SkillService } from '../../../services/skill.service';



export var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }
];

@Component({
  selector: 'app-skill-monitoring',
  templateUrl: './skill-monitoring.component.html',
  styleUrls: ['./skill-monitoring.component.css']
})
export class SkillMonitoringComponent implements OnInit {

  skills:any[]
  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  skillsChart = [
    {
      "name": "Customer Relations",
      "value": 10
    },
    {
      "name": "SEO",
      "value": 4
    },
    {
      "name": "Aggressive Marketing",
      "value": 7
    },
      {
      "name": "HSE",
      "value": 3
    }
  ];

  showTable=true;

  constructor(
    private modalService: NgbModal,
    private skillService:SkillService
  ) {
    // Object.assign(this, { single });
   }

  ngOnInit(): void {
    this.getSkills()
    this.getAllSkills()
  }

  getSkills(){
    this.skills = [
      {
        employeeName:'Adigun Ibrahim',
        numberOfSkills:5,
        numberOfCertifiedSkills:3,
        skills:['skill1','skill2','skill3','skill4','skill5'],
        certifiedSkills:['certified skill1','certified skill2','certified skill3']
      },
      {
        employeeName:'Adigun Adedotun',
        numberOfSkills:4,
        numberOfCertifiedSkills:2,
        skills:['skill1','skill2','skill3','skill4','skill5'],
        certifiedSkills:['certified skill1','certified skill2','certified skill3']
      },
      {
        employeeName:'Adigun Akanni',
        numberOfSkills:10,
        numberOfCertifiedSkills:7,
        skills:['skill1','skill2','skill3','skill4','skill5'],
        certifiedSkills:['certified skill1','certified skill2','certified skill3']
      },
      {
        employeeName:'Adigun Omotojola',
        numberOfSkills:2,
        numberOfCertifiedSkills:1,
        skills:['skill1','skill2','skill3','skill4','skill5'],
        certifiedSkills:['certified skill1','certified skill2','certified skill3']
      },
      
    ]
  }



  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  open(content, options = {}) {
    this.modalService.open(content, options).result.then((result) => {
    },
    err=>{})
  }

  getAllSkills(){
    this.skillService.getAllSkills().subscribe(data=>{
      console.log(data)
    },
      err=>{
        console.log(err)
      })
  }

}
