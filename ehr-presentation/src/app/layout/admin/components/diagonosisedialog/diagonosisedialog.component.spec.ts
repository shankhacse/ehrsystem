import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonosisedialogComponent } from './diagonosisedialog.component';

describe('DiagonosisedialogComponent', () => {
  let component: DiagonosisedialogComponent;
  let fixture: ComponentFixture<DiagonosisedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagonosisedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonosisedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
