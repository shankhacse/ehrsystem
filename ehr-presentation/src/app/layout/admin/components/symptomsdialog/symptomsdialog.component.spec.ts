import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsdialogComponent } from './symptomsdialog.component';

describe('SymptomsdialogComponent', () => {
  let component: SymptomsdialogComponent;
  let fixture: ComponentFixture<SymptomsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymptomsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
