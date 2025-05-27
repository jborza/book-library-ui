import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPaginationComponent } from './books-pagination.component';

describe('BooksPaginationComponent', () => {
  let component: BooksPaginationComponent;
  let fixture: ComponentFixture<BooksPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
