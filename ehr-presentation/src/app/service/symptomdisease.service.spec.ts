import { TestBed } from '@angular/core/testing';

import { SymptomdiseaseService } from './symptomdisease.service';

describe('SymptomdiseaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SymptomdiseaseService = TestBed.get(SymptomdiseaseService);
    expect(service).toBeTruthy();
  });
});
