import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportgrnComponent } from './importgrn.component';

describe('ImportgrnComponent', () => {
  let component: ImportgrnComponent;
  let fixture: ComponentFixture<ImportgrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportgrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportgrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
