import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Array<{ id: number;
    title: string,
    author_name: string,
    isbn: string,
    cover_image: string,
    cover_image_tiny: string,
    year: string,
    status: string,
    type: string,
    rating: number,
    book_type: string,
    genre: string,
  }> = [];
  authorName: string = '';
  statusFilter: string = '';
  typeFilter: string = '';

  constructor(private booksService: BooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('BookListComponent initialized');
    this.route.paramMap.subscribe((params) => {
      this.authorName = params.get('author') || '';
      this.fetchBooksByAuthor(this.authorName);
    });
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  fetchBooks(): void {
    this.booksService.getBooksFiltered(this.statusFilter, this.typeFilter)
      .subscribe((response) => {
      if (Array.isArray(response)) {
        this.books = response;
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }

  fetchBooksByAuthor(authorName: string): void {
    this.booksService.searchBooks(authorName).subscribe((response) => {
      if (Array.isArray(response)) {
        this.books = response;
      } else {
        console.error('Unexpected API response format:', response);
      }
    });
  }
}