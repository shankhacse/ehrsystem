import { TestBed } from '@angular/core/testing';

import { IpdService } from './ipd.service';

describe('IpdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IpdService = TestBed.get(IpdService);
    expect(service).toBeTruthy();
  });
});
