import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisiondialogComponent } from './divisiondialog.component';

describe('DivisiondialogComponent', () => {
  let component: DivisiondialogComponent;
  let fixture: ComponentFixture<DivisiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
