import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportgrnvalidationdialogComponent } from './importgrnvalidationdialog.component';

describe('ImportgrnvalidationdialogComponent', () => {
  let component: ImportgrnvalidationdialogComponent;
  let fixture: ComponentFixture<ImportgrnvalidationdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportgrnvalidationdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportgrnvalidationdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
