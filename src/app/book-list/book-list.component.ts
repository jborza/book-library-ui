import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { BookFilterComponent } from '../book-filter/book-filter.component';
import { BooksPaginationComponent } from '../books-pagination/books-pagination.component';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [
    CommonModule,
    RouterModule,
    BookFilterComponent,
    BooksPaginationComponent],
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  originalBooks: Book[] = [];
  authorName: string = '';
  statusFilter: string = '';
  typeFilter: string = '';
  sortColumn: string = ''; // Column to sort by
  sortDirection: boolean = true; // true = ascending, false = descending
  authors: string[] = [];
  minmax: any;
  genres: string[] = [];
  languages: string[] = [];
  series: string[] = [];
  count: number = 0;
  totalPages: number = 0;
  readonly pageSize: number = 10; // Number of items per page
  paginatedBooks: Book[] = [];
  currentPage: number = 1; // Current page number

  constructor(private booksService: BooksService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.authorName = params.get('author') || '';
      this.typeFilter = params.get('type') || '';
      this.statusFilter = params.get('status') || '';
      this.fetchBooks();
    });
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchBooks();
  }

  fetchBooks(): void {
    console.log('Fetching books with filters:', this.statusFilter, this.typeFilter, this.currentPage, this.pageSize);
    this.booksService.getBooksFiltered(this.statusFilter, this.typeFilter, this.currentPage, this.pageSize)
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
        // let the paging component know how many books there are
        this.totalPages = Math.ceil(this.count / this.pageSize);
        console.log('list: Total pages:', this.totalPages);
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