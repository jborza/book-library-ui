import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { BookFilterComponent } from '../book-filter/book-filter.component';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [
    CommonModule,
    RouterModule,
    BookFilterComponent],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  originalBooks: Book[] = [];
  authorName: string = '';
  statusFilter: string = '';
  typeFilter: string = '';
  sortColumn: string = ''; // Column to sort by
  sortDirection: boolean = true; // true = ascending, false = descending
  bookPerPage: number = 1000;
  authors: string[] = [];
  minmax: any;
  genres: string[] = [];
  languages: string[] = [];
  series: string[] = [];
  count: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  paginationDisplay: (number | string)[] = [];
  readonly pageSize: number = 10; // Number of items per page
  paginatedBooks: Book[] = [];

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

  setupPagination(): void {
    this.totalPages = Math.ceil(this.books.length / this.pageSize);
    this.updatePaginationDisplay();
    this.changePage(1); // Set the first page as default
  }

  updatePaginationDisplay(): void {
    const maxVisiblePages = 14; // Number of visible page numbers
    const delta = Math.floor(maxVisiblePages / 2); // Pages around the current page
    const display: (number | string)[] = [];

    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than or equal to maxVisiblePages
      for (let i = 1; i <= this.totalPages; i++) display.push(i);
    } else {
      // Add the first page
      display.push(1);

      // Ellipsis before the current page range
      if (this.currentPage > delta + 2) {
        display.push('...');
      }

      // Page numbers around the current page
      const start = Math.max(2, this.currentPage - delta);
      const end = Math.min(this.totalPages - 1, this.currentPage + delta);

      for (let i = start; i <= end; i++) {
        display.push(i);
      }

      // Ellipsis after the current page range
      if (this.currentPage < this.totalPages - delta - 1) {
        display.push('...');
      }

      // Add the last page
      display.push(this.totalPages);
    }

    this.paginationDisplay = display;
  }

  changePage(page: number | string): void {
     if (typeof page !== 'number') return;
    //otherwise, if page is a number, check if it's within the valid range
    if(page < 1 || page > this.totalPages) return;

    this.currentPage = page as number;
    this.updatePaginationDisplay();

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.paginatedBooks = this.books.slice(startIndex, endIndex);
   }

  fetchBooks(): void {
    this.booksService.getBooksFiltered(this.statusFilter, this.typeFilter, this.bookPerPage)
      .subscribe((response) => {
        this.minmax = response.minmax;
        this.authors = response.authors;
        this.genres = response.genres;
        this.languages = response.languages;
        this.series = response.series;
        this.count = response.count;
        const books = response.books;
        if (Array.isArray(books)) {
          this.books = books.map(bookData => new Book(bookData));
          // generate surnames for each book
          for (const book of this.books) {
            const authorName = book.author_name;
            const surname = authorName.split(' ').slice(-1)[0]; // Get the last name
            book.author_surname = surname; // Add surname property to the book object
          }
          this.originalBooks = [...this.books]; // Store the original list for filtering
        } else {
          console.error('Unexpected API response format:', response);
        }
        this.setupPagination();
      });
  }

  // TODO we'll have to sort on server side
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Toggle sort direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Default to ascending
    }

    this.books = [...this.originalBooks]; // Reset to original list before sorting
    this.books.sort((a: any, b: any) => {
      const valueA = a[column] === null || a[column] === undefined ? '' : a[column];
      const valueB = b[column] === null || b[column] === undefined ? '' : b[column];

      const compared = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return compared * (this.sortDirection ? 1 : -1);
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'sort-icon asc' : 'sort-icon desc';
    }
    return '';
  }

  // Update the list when filters change
  onFiltersChanged(filters: any) {
    //this.fetchBooks(filters);
    console.log('Filters changed:', filters);
  }
}