import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportdependentdialogComponent } from './importdependentdialog.component';

describe('ImportdependentdialogComponent', () => {
  let component: ImportdependentdialogComponent;
  let fixture: ComponentFixture<ImportdependentdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportdependentdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportdependentdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
