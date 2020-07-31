import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillMonitoringComponent } from './skill-monitoring.component';

describe('SkillMonitoringComponent', () => {
  let component: SkillMonitoringComponent;
  let fixture: ComponentFixture<SkillMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
