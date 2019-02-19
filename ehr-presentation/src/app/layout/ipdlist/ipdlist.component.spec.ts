import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdlistComponent } from './ipdlist.component';

describe('IpdlistComponent', () => {
  let component: IpdlistComponent;
  let fixture: ComponentFixture<IpdlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpdlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
