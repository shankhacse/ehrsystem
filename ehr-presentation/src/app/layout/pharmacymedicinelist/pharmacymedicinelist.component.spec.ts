import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacymedicinelistComponent } from './pharmacymedicinelist.component';

describe('PharmacymedicinelistComponent', () => {
  let component: PharmacymedicinelistComponent;
  let fixture: ComponentFixture<PharmacymedicinelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacymedicinelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacymedicinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
