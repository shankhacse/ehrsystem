import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientbarcodeprintComponent } from './patientbarcodeprint.component';

describe('PatientbarcodeprintComponent', () => {
  let component: PatientbarcodeprintComponent;
  let fixture: ComponentFixture<PatientbarcodeprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientbarcodeprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientbarcodeprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
