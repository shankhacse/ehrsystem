import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienregistrationComponent } from './patienregistration.component';

describe('PatienregistrationComponent', () => {
  let component: PatienregistrationComponent;
  let fixture: ComponentFixture<PatienregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
