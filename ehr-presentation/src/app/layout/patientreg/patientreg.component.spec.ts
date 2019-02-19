import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientregComponent } from './patientreg.component';

describe('PatientregComponent', () => {
  let component: PatientregComponent;
  let fixture: ComponentFixture<PatientregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
