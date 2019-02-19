import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationlistComponent } from './investigationlist.component';

describe('InvestigationlistComponent', () => {
  let component: InvestigationlistComponent;
  let fixture: ComponentFixture<InvestigationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
