import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallanlistComponent } from './challanlist.component';

describe('ChallanlistComponent', () => {
  let component: ChallanlistComponent;
  let fixture: ComponentFixture<ChallanlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallanlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
