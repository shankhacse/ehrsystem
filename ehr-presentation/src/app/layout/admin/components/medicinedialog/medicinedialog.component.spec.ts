import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinedialogComponent } from './medicinedialog.component';

describe('MedicinedialogComponent', () => {
  let component: MedicinedialogComponent;
  let fixture: ComponentFixture<MedicinedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
