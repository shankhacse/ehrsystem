import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationdischargeComponent } from './confirmationdischarge.component';

describe('ConfirmationdischargeComponent', () => {
  let component: ConfirmationdischargeComponent;
  let fixture: ComponentFixture<ConfirmationdischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationdischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationdischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
