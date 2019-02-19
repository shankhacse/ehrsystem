import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdregistrationComponent } from './ipdregistration.component';

describe('IpdregistrationComponent', () => {
  let component: IpdregistrationComponent;
  let fixture: ComponentFixture<IpdregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpdregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
