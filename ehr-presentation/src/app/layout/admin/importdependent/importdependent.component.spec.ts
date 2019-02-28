import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdependentComponent } from './importdependent.component';

describe('ImportdependentComponent', () => {
  let component: ImportdependentComponent;
  let fixture: ComponentFixture<ImportdependentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdependentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdependentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
