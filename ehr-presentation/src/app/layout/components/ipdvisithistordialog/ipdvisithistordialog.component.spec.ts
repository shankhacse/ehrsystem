import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdvisithistordialogComponent } from './ipdvisithistordialog.component';

describe('IpdvisithistordialogComponent', () => {
  let component: IpdvisithistordialogComponent;
  let fixture: ComponentFixture<IpdvisithistordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpdvisithistordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdvisithistordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
