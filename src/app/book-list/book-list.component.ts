import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { BookFilterComponent } from '../book-filter/book-filter.component';
import { BooksPaginationComponent } from '../books-pagination/books-pagination.component';
import { BookFilter } from '../book-filter';
import { SettingsService } from '../settings.service';
import { LibraryEventsService } from '../library-events.service';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [
    CommonModule,
    RouterModule,
    BookFilterComponent,
    BooksPaginationComponent,
    TopBarComponent
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  originalBooks: Book[] = [];
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
  pageSize: number = 10; // Number of items per page
  currentPage: number = 1; // Current page number
  filters: BookFilter | undefined;
  selectedBookIds: number[] = []; // IDs of selected books
  currentUrl: string;
  searchText: string = ''; // Search text for filtering books

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private router: Router,
    private libraryEvents: LibraryEventsService
  ) {
    this.currentUrl = router.url;
  }

  ngOnInit(): void {
    this.pageSize = this.settingsService.getSetting('pageSize') || 20; // Default page size
    this.route.queryParamMap.subscribe((params) => {
      this.typeFilter = params.get('type') || '';
      this.statusFilter = params.get('status') || '';
      this.fetchBooks();
      this.fetchAuthors();
    });
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    this.fetchBooks();
  }

  // need to fetch authors for the filter
  // doesn't change on paging, only on filter change
  fetchAuthors(): void {
    this.booksService.getAuthorsFiltered().subscribe((response) => {
      this.authors = response;
    });
  }

  fetchBooks(): void {
    console.log(
      'Fetching books with filters:',
      this.statusFilter,
      this.typeFilter,
      this.currentPage,
      this.pageSize,
      this.filters
    );
    this.booksService
      .getBooksFiltered(
        this.statusFilter,
        this.typeFilter,
        this.filters,
        this.sortColumn,
        this.sortDirection,
        this.currentPage,
        this.pageSize
      )
      .subscribe((response) => {
        this.minmax = response.minmax;
        this.genres = response.genres;
        this.languages = response.languages;
        this.series = response.series;
        this.count = response.count;
        const books = response.books;
        if (Array.isArray(books)) {
          this.books = books.map((bookData) => new Book(bookData));
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

    this.fetchBooks(); // Fetch books again after sorting
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'sort-icon asc' : 'sort-icon desc';
    }
    return '';
  }

  // Update the list when filters change
  onFiltersChanged(filters: BookFilter): void {
    this.filters = filters;
    this.fetchBooks();
    // TODO probably also reset the page to 1
  }

  onSaveRequested(parameters: any[]): void {
    const filters: BookFilter = parameters[0];
    const saveName: string = parameters[1];
    const icon: string = parameters[2];
    console.log('Save requested:', ' name:', saveName, 'filters:', filters, 'icon:', icon);
    this.filters = filters;
    this.filters.icon = icon;
    this.settingsService.saveLibrary(saveName, filters);
    this.libraryEvents.notifyLibrarySaved();
  }

  isSelected(bookId: number): boolean {
    return this.selectedBookIds.includes(bookId);
  }

  // Handle row click (supports Ctrl+click for multi-selection)
  onRowClick(bookId: number, event: MouseEvent): void {
    if (event.ctrlKey) {
      // Toggle selection for Ctrl+Click
      this.toggleSelection(bookId);
    } else {
      // Clear other selections and select only the clicked row
      this.selectedBookIds = [bookId];
    }
  }

  // Handle right-click (context menu) to select a row
  onRowRightClick(bookId: number, event: MouseEvent): void {
    event.preventDefault(); // Prevent the default browser context menu
    this.toggleSelection(bookId);
  }

  // Toggle selection for a single book
  toggleSelection(bookId: number): void {
    if (this.isSelected(bookId)) {
      this.selectedBookIds = this.selectedBookIds.filter((id) => id !== bookId);
    } else {
      this.selectedBookIds.push(bookId);
    }
  }

  // Toggle selection for all books
  toggleAllSelections(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedBookIds = this.books.map((book) => book.id);
    } else {
      this.selectedBookIds = [];
    }
  }

  // Check if all books are selected
  areAllSelected(): boolean {
    return this.books.every((book) => this.isSelected(book.id));
  }

  // Navigate to the edit page with selected book IDs
  editSelectedBooks(): void {
    const queryParams = this.selectedBookIds.join(',');
    this.router.navigate([`/books/edit_multiple`], {
      queryParams: { id: queryParams },
    });
  }

  searchCalled($event: any): void{
    console.log('Search called from top bar');
    this.fetchBooks();
  }

  searchTextChange($event: any):void{
    console.log('Search text changed from top bar');
    console.log('Search text:', $event);
    //this.fetchBooks();
  }
}
