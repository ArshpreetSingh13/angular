import { TestBed } from '@angular/core/testing';

import { ExpansesService } from './expanses.service';

describe('ExpansesService', () => {
  let service: ExpansesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpansesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
