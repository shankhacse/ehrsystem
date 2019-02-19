import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayspatientreglistComponent } from './todayspatientreglist.component';

describe('TodayspatientreglistComponent', () => {
  let component: TodayspatientreglistComponent;
  let fixture: ComponentFixture<TodayspatientreglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayspatientreglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayspatientreglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
