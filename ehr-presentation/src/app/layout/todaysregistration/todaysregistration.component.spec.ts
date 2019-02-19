import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysregistrationComponent } from './todaysregistration.component';

describe('TodaysregistrationComponent', () => {
  let component: TodaysregistrationComponent;
  let fixture: ComponentFixture<TodaysregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
