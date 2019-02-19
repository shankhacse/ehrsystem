import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonosisComponent } from './diagonosis.component';

describe('DiagonosisComponent', () => {
  let component: DiagonosisComponent;
  let fixture: ComponentFixture<DiagonosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagonosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
