import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessdialogwithprintComponent } from './successdialogwithprint.component';

describe('SuccessdialogwithprintComponent', () => {
  let component: SuccessdialogwithprintComponent;
  let fixture: ComponentFixture<SuccessdialogwithprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessdialogwithprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessdialogwithprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
