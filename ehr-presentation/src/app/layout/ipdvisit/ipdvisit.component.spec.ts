import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpdvisitComponent } from './ipdvisit.component';

describe('IpdvisitComponent', () => {
  let component: IpdvisitComponent;
  let fixture: ComponentFixture<IpdvisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpdvisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpdvisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
