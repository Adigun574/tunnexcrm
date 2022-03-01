import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProformaDetailComponent } from './view-proforma-detail.component';

describe('ViewProformaDetailComponent', () => {
  let component: ViewProformaDetailComponent;
  let fixture: ComponentFixture<ViewProformaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProformaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProformaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
