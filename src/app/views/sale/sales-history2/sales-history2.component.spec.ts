import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHistory2Component } from './sales-history2.component';

describe('SalesHistory2Component', () => {
  let component: SalesHistory2Component;
  let fixture: ComponentFixture<SalesHistory2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesHistory2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesHistory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
