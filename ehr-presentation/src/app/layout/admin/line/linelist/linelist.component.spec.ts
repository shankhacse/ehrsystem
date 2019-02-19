import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinelistComponent } from './linelist.component';

describe('LinelistComponent', () => {
  let component: LinelistComponent;
  let fixture: ComponentFixture<LinelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
