import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodepatientregistrationdialogComponent } from './barcodepatientregistrationdialog.component';

describe('BarcodepatientregistrationdialogComponent', () => {
  let component: BarcodepatientregistrationdialogComponent;
  let fixture: ComponentFixture<BarcodepatientregistrationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodepatientregistrationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodepatientregistrationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
