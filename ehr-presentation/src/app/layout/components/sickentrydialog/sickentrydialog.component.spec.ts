import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickentrydialogComponent } from './sickentrydialog.component';

describe('SickentrydialogComponent', () => {
  let component: SickentrydialogComponent;
  let fixture: ComponentFixture<SickentrydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickentrydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickentrydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
