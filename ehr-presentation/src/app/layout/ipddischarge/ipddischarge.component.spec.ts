import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpddischargeComponent } from './ipddischarge.component';

describe('IpddischargeComponent', () => {
  let component: IpddischargeComponent;
  let fixture: ComponentFixture<IpddischargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpddischargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpddischargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
