import { TestBed } from '@angular/core/testing';

import { GlobalconstantService } from './globalconstant.service';

describe('GlobalconstantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalconstantService = TestBed.get(GlobalconstantService);
    expect(service).toBeTruthy();
  });
});
