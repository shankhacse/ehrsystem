import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildvaccinationComponent } from './childvaccination.component';

describe('ChildvaccinationComponent', () => {
  let component: ChildvaccinationComponent;
  let fixture: ComponentFixture<ChildvaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildvaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildvaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
