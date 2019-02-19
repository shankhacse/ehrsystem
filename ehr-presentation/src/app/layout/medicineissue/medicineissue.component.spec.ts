import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineissueComponent } from './medicineissue.component';

describe('MedicineissueComponent', () => {
  let component: MedicineissueComponent;
  let fixture: ComponentFixture<MedicineissueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineissueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
