import { TestBed } from '@angular/core/testing';

import { MatchProvidersService } from './match-providers.service';

describe('MatchProvidersService', () => {
  let service: MatchProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
