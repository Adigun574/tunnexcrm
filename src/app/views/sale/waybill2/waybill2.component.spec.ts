import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Waybill2Component } from './waybill2.component';

describe('Waybill2Component', () => {
  let component: Waybill2Component;
  let fixture: ComponentFixture<Waybill2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Waybill2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Waybill2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
