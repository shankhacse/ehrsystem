import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientadddialogComponent } from './patientadddialog.component';

describe('PatientadddialogComponent', () => {
  let component: PatientadddialogComponent;
  let fixture: ComponentFixture<PatientadddialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientadddialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientadddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
