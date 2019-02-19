import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsuploadComponent } from './reportsupload.component';

describe('ReportsuploadComponent', () => {
  let component: ReportsuploadComponent;
  let fixture: ComponentFixture<ReportsuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
