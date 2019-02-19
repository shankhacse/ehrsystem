import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedmedicineComponent } from './issuedmedicine.component';

describe('IssuedmedicineComponent', () => {
  let component: IssuedmedicineComponent;
  let fixture: ComponentFixture<IssuedmedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuedmedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuedmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
