import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickleaveapprovalComponent } from './sickleaveapproval.component';

describe('SickleaveapprovalComponent', () => {
  let component: SickleaveapprovalComponent;
  let fixture: ComponentFixture<SickleaveapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickleaveapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickleaveapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
