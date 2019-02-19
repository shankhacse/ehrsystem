import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdnewprescconfirmationdialogComponent } from './opdnewprescconfirmationdialog.component';

describe('OpdnewprescconfirmationdialogComponent', () => {
  let component: OpdnewprescconfirmationdialogComponent;
  let fixture: ComponentFixture<OpdnewprescconfirmationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdnewprescconfirmationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdnewprescconfirmationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
