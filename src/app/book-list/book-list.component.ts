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
    this.route.queryParamMap.subscribe((params) => {
      this.authorName = params.get('author') || '';
      this.typeFilter = params.get('type') || '';
      this.statusFilter = params.get('status') || '';

      this.fetchBooks();
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
}