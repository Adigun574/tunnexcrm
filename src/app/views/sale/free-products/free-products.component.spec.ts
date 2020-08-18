import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeProductsComponent } from './free-products.component';

describe('FreeProductsComponent', () => {
  let component: FreeProductsComponent;
  let fixture: ComponentFixture<FreeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
