import { TestBed } from '@angular/core/testing';

import { BookDataService } from '../../features/books/services/book-data.service';

describe('BookDataServiceService', () => {
  let service: BookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
