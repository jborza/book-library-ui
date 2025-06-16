import { TestBed } from '@angular/core/testing';

import { ColumnVisibilityService } from './column-visibility.service';

describe('ColumnVisibilityService', () => {
  let service: ColumnVisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnVisibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
