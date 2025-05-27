import { TestBed } from '@angular/core/testing';

import { LibraryEventsService } from './library-events.service';

describe('LibraryEventsService', () => {
  let service: LibraryEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
