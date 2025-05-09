import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.less'
})
export class BookDetailsComponent implements OnInit {

  bookId: string | null = null;
  book: any = null;

  constructor(private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    // Fetch book details using the bookId
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
  }

  fetchBookDetails(bookId: string) {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.book = data;
    });
  }

  match() : void {
    // retrieve search results from the service
    const searchQuery = this.book.author_name + " - " + this.book.title;
    // book/:id/match
    this.router.navigate(['/book', this.book.id, 'match'],
       { queryParams: { query: searchQuery } });
  }

  edit() : void {
    // book/:id/edit
    this.router.navigate(['/books', this.book.id, 'edit']);
  }
}