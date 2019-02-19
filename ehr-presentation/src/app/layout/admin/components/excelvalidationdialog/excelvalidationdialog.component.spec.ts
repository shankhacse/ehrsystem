import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelvalidationdialogComponent } from './excelvalidationdialog.component';

describe('ExcelvalidationdialogComponent', () => {
  let component: ExcelvalidationdialogComponent;
  let fixture: ComponentFixture<ExcelvalidationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelvalidationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelvalidationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
