import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinedialogComponent } from './linedialog.component';

describe('LinedialogComponent', () => {
  let component: LinedialogComponent;
  let fixture: ComponentFixture<LinedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
