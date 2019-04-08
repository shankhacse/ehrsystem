import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedsickleavedetailsdialogComponent } from './approvedsickleavedetailsdialog.component';

describe('ApprovedsickleavedetailsdialogComponent', () => {
  let component: ApprovedsickleavedetailsdialogComponent;
  let fixture: ComponentFixture<ApprovedsickleavedetailsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedsickleavedetailsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedsickleavedetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
