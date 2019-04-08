import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinetypeComponent } from './medicinetype.component';

describe('MedicinetypeComponent', () => {
  let component: MedicinetypeComponent;
  let fixture: ComponentFixture<MedicinetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
