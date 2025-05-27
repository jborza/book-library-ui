import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMatchResultsComponent } from './book-match-results.component';

describe('BookMatchResultsComponent', () => {
  let component: BookMatchResultsComponent;
  let fixture: ComponentFixture<BookMatchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMatchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMatchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
