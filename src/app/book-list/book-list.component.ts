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
  originalBooks: Book[] = [];
  authorName: string = '';
  statusFilter: string = '';
  typeFilter: string = '';
  sortColumn: string = ''; // Column to sort by
  sortDirection: boolean = true; // true = ascending, false = descending

  constructor(private booksService: BooksService,
    private route: ActivatedRoute
  ) { }

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
          this.originalBooks = [...this.books]; // Store the original list for filtering
        } else {
          console.error('Unexpected API response format:', response);
        }
      });
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Toggle sort direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Default to ascending
    }

    this.books = [...this.originalBooks]; // Reset to original list before sorting
    this.books.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.sortDirection ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'sort-icon asc' : 'sort-icon desc';
    }
    return '';
  }
}