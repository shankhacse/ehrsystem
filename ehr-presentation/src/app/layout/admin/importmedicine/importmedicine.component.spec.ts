import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportmedicineComponent } from './importmedicine.component';

describe('ImportmedicineComponent', () => {
  let component: ImportmedicineComponent;
  let fixture: ComponentFixture<ImportmedicineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportmedicineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
