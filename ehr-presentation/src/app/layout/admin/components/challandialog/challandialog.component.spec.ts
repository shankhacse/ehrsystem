import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallandialogComponent } from './challandialog.component';

describe('ChallandialogComponent', () => {
  let component: ChallandialogComponent;
  let fixture: ComponentFixture<ChallandialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallandialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallandialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
