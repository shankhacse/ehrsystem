import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpdpreprationComponent } from './opdprepration.component';

describe('OpdpreprationComponent', () => {
  let component: OpdpreprationComponent;
  let fixture: ComponentFixture<OpdpreprationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpdpreprationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpdpreprationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
