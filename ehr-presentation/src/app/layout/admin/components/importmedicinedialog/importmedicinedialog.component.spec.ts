import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportmedicinedialogComponent } from './importmedicinedialog.component';

describe('ImportmedicinedialogComponent', () => {
  let component: ImportmedicinedialogComponent;
  let fixture: ComponentFixture<ImportmedicinedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportmedicinedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportmedicinedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
