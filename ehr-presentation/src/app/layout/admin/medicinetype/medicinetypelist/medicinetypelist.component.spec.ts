import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinetypelistComponent } from './medicinetypelist.component';

describe('MedicinetypelistComponent', () => {
  let component: MedicinetypelistComponent;
  let fixture: ComponentFixture<MedicinetypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinetypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinetypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
