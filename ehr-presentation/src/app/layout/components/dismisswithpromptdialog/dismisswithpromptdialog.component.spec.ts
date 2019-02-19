import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DismisswithpromptdialogComponent } from './dismisswithpromptdialog.component';

describe('DismisswithpromptdialogComponent', () => {
  let component: DismisswithpromptdialogComponent;
  let fixture: ComponentFixture<DismisswithpromptdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DismisswithpromptdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DismisswithpromptdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
