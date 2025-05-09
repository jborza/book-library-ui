import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
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
      this.books = data.map((b:any) => new Book(b))
    });
  }

  fetchBooks(): void {
    this.booksService.getBooksFiltered(this.statusFilter, this.typeFilter)
      .subscribe((response) => {
      if (Array.isArray(response)) {
        this.books = response.map(bookData => new Book(bookData));
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