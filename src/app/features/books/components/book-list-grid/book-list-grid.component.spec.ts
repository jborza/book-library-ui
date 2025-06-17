import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListGridComponent } from './book-list-grid.component';

describe('BookListGridComponent', () => {
  let component: BookListGridComponent;
  let fixture: ComponentFixture<BookListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
