import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickleaveregisterComponent } from './sickleaveregister.component';

describe('SickleaveregisterComponent', () => {
  let component: SickleaveregisterComponent;
  let fixture: ComponentFixture<SickleaveregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickleaveregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickleaveregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
