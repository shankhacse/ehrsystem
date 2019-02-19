import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterentrydialogComponent } from './masterentrydialog.component';

describe('MasterentrydialogComponent', () => {
  let component: MasterentrydialogComponent;
  let fixture: ComponentFixture<MasterentrydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterentrydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterentrydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
