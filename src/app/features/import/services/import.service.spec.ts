import { TestBed } from '@angular/core/testing';

import { ImportService } from './import.service';

describe('ImportCsvService', () => {
  let service: ImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
