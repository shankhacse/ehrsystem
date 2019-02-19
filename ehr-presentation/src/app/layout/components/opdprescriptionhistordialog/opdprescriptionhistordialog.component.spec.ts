import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdprescriptionhistordialogComponent } from './opdprescriptionhistordialog.component';

describe('OpdprescriptionhistordialogComponent', () => {
  let component: OpdprescriptionhistordialogComponent;
  let fixture: ComponentFixture<OpdprescriptionhistordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdprescriptionhistordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdprescriptionhistordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
