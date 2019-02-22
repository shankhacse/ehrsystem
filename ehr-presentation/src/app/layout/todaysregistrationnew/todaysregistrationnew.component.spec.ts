import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysregistrationnewComponent } from './todaysregistrationnew.component';

describe('TodaysregistrationnewComponent', () => {
  let component: TodaysregistrationnewComponent;
  let fixture: ComponentFixture<TodaysregistrationnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysregistrationnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysregistrationnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
