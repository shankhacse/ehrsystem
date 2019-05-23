import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientbarcodedialogComponent } from './patientbarcodedialog.component';

describe('PatientbarcodedialogComponent', () => {
  let component: PatientbarcodedialogComponent;
  let fixture: ComponentFixture<PatientbarcodedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientbarcodedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientbarcodedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
