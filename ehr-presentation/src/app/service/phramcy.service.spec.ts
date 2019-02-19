import { TestBed } from '@angular/core/testing';

import { PhramcyService } from './phramcy.service';

describe('PhramcyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhramcyService = TestBed.get(PhramcyService);
    expect(service).toBeTruthy();
  });
});
