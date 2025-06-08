import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { BookFilterComponent } from '../book-filter/book-filter.component';
import { BooksPaginationComponent } from '../books-pagination/books-pagination.component';
import { BookFilter } from '../../book-filter';
import { SettingsService } from '../../../../core/services/settings.service';
import { LibraryEventsService } from '../../../../core/services/library-events.service';
import { TopBarComponent } from '../../../../top-bar/top-bar.component';
import { ContextMenuComponent } from '../../../../shared/components/context-menu/context-menu.component';
import { AddToCollectionComponent } from '../../../collections/components/add-to-collection/add-to-collection.component';
import { Collection } from '../../../collections/models/collection.model';
import { CollectionsService } from '../../../../core/services/collections.service';
import { AuthorsService } from '../../../authors/services/authors.service';
import { FormsModule } from '@angular/forms';
import { ToNumberPipe } from '../../../../shared/pipes/to-number.pipe';
import { MultipleMatchOptionsComponent } from '../multiple-match-options/multiple-match-options.component';
import { ApiService } from '../../../../core/services/api.service';

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
    TopBarComponent,
    ContextMenuComponent,
    AddToCollectionComponent,
    FormsModule,
    ToNumberPipe,
    MultipleMatchOptionsComponent,
  ],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  originalBooks: Book[] = [];
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
  isContextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  showAddToCollection = false;
  collections: Collection[] = [];
  lastSelectedBookId: number | null = null; // Track the last clicked book ID
  collection: number | null = null; // Selected collection ID for filtering;
  contextMenu: ContextMenuComponent | null = null;
  bookIds: number[] = [];

  @ViewChild('contextMenu') set contextMenuSetter(cm: ContextMenuComponent | null) {
    this.contextMenu = cm;
  }

  //resizing
  private isResizing: boolean = false;
  private currentColumn: number = -1;
  private startX: number = 0;
  private startWidth: number = 0;

  @ViewChild(MultipleMatchOptionsComponent) multipleMatchOptions!: MultipleMatchOptionsComponent;

  columns: {
    name: string;
    value: keyof Book;
    visible: boolean;
    link?: (row: Book) => string;
    queryParams?: (row: Book) => Params;
    component?: string;
    width?: number;
  }[] = [
      {
        name: 'Title', value: 'title', visible: true, link: (row: any) => `/books/${row.id}`, queryParams: (row: Book) => ({}),
        width: 300
      },
      {
        name: 'Author', value: 'author_name', visible: true, link: (row: any) => '/books',
        queryParams: (row: Book) => ({ author: row.author_name }),
        width: 150
      },
      { name: 'Publisher', value: 'publisher', visible: true, width: 100 },
      { name: 'Year', value: 'year', visible: true },
      { name: 'Genre', value: 'genre', visible: true, width: 150 },
      { name: 'ISBN', value: 'isbn', visible: true, width: 140 },
      { name: 'Language', value: 'language', visible: true },
      { name: 'Series', value: 'series', visible: true },
      { name: 'Pages', value: 'pages', visible: true, width: 50 },
      { name: 'Rating', value: 'rating', visible: true, component: 'stars' },
      { name: 'Status', value: 'status', visible: true },
    ];

  globalString = String;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private settingsService: SettingsService,
    private router: Router,
    private libraryEvents: LibraryEventsService,
    private collectionsService: CollectionsService,
    private authorsService: AuthorsService,
    private apiService: ApiService
  ) {
    this.currentUrl = router.url;
  }

  ngOnInit(): void {
    this.pageSize = this.settingsService.getSetting('pageSize') || 20; // Default page size
    this.route.queryParamMap.subscribe((params) => {
      this.currentPage = Number(params.get('page')) || 1;
      this.collection = Number(params.get('collection')) || null;
      // if bookids is in the URL, parse it
      const bookIdsParam = params.get('books');
      if (bookIdsParam) {
        this.bookIds = bookIdsParam.split(',').map(id => Number(id));
      }
      this.fetchBooks();
      this.fetchAuthors();
      this.fetchCollections();
    });
    document.addEventListener('click', this.hideContextMenu.bind(this));
    this.loadColumnVisibility();
    this.loadColumnWidths();
    this.setupResizeListeners();
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.hideContextMenu.bind(this));
  }

  onMouseDown(event: MouseEvent, columnIndex: number) {
    if (this.isNearRightEdge(event)) {
      event.preventDefault();
      event.stopPropagation();

      this.isResizing = true;
      this.currentColumn = columnIndex;
      this.startX = event.clientX;
      const width = this.columns[columnIndex].width || 100;
      this.startWidth = width;

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
  }

  // TODO save column widths to settings
  private saveColumnWidths() {
    const widths = this.columns.map(col => ({ value: col.value, width: col.width }));
    // TODO save
  }

  // TODO load column widths from settings
  private loadColumnWidths() {
  }

  private isNearRightEdge(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const rightEdgeZone = 10; // 10px zone for resize
    return event.clientX > rect.right - rightEdgeZone;
  }

  private setupResizeListeners() {
    document.addEventListener('mousemove', (event) => {
      if (this.isResizing && this.currentColumn !== -1) {
        const deltaX = event.clientX - this.startX;
        const newWidth = Math.max(50, this.startWidth + deltaX); // Minimum width of 50px
        this.columns[this.currentColumn].width = newWidth;
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isResizing) {
        this.isResizing = false;
        this.currentColumn = -1;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        this.saveColumnWidths();
      }
    });
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
    // this.fetchBooks();
    this.currentUrl = this.router.url;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage }, // Add or update the `page` query parameter
      queryParamsHandling: 'merge', // Preserve other query parameters
    });
  }

  // need to fetch authors for the filter
  // doesn't change on paging, only on filter change
  fetchAuthors(): void {
    if (!this.filters) {
      return;
    }
    console.log('Fetching authors with filters:', this.filters);
    this.authorsService.getAuthorsFiltered(this.filters).subscribe((response) => {
      this.authors = response;
    });
  }

  fetchCollections(): void {
    this.collectionsService.getCollections().subscribe((response) => {
      console.log('Collections fetched:', response);
      this.collections = response || [];
    });
  }

  fetchBooks(): void {
    console.log(
      'Fetching books with filters: currentPage',
      this.currentPage,
      'pageSize:',
      this.pageSize,
      'filters:',
      this.filters
    );
    if (!this.filters) {
      return;
    }
    // TODO solve better than this
    this.filters.collection = this.collection;
    this.filters.bookIds = this.bookIds;

    // TODO fix this in a nicer way
    // map sort column to the API field
    let sortColumnMapped = this.sortColumn;
    if (this.sortColumn === 'year') {
      sortColumnMapped = 'year_published'; // API uses year_published
    } else if (this.sortColumn === 'author_name') {
      sortColumnMapped = 'surname_first'; // API uses author
    }
    else if (this.sortColumn === 'pages') {
      sortColumnMapped = 'page_count'; // API uses page_count
    }
    this.booksService
      .getBooksFiltered(
        this.filters,
        sortColumnMapped,
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
          // TODO not necessary anymore
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
      });
  }

  sortBy(column: string, event: MouseEvent): void {
    console.log('Sorting start :', column, 'Event:', event);
    if (this.isResizing || this.isNearRightEdge(event)) {
      return; // Don't sort if we're resizing
    }
    console.log('Sorting by column:', column);
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
    this.fetchAuthors(); // Fetch authors for the filter
    // TODO probably also reset the page to 1
  }

  onSaveRequested(parameters: any[]): void {
    const filters: BookFilter = parameters[0];
    const saveName: string = parameters[1];
    const icon: string = parameters[2];
    console.log(
      'Save requested:',
      ' name:',
      saveName,
      'filters:',
      filters,
      'icon:',
      icon
    );
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
    if (event.shiftKey && this.lastSelectedBookId !== null) {
      event.preventDefault(); // Prevent default text selection behavior

      // Shift+Click: Select range of rows between last clicked and current clicked row
      const lastIndex = this.books.findIndex(book => book.id === this.lastSelectedBookId);
      const currentIndex = this.books.findIndex(book => book.id === bookId);

      if (lastIndex !== -1 && currentIndex !== -1) {
        const [start, end] = [lastIndex, currentIndex].sort((a, b) => a - b);
        const rangeIds = this.books.slice(start, end + 1).map(book => book.id);

        // Add the range to the selection
        this.selectedBookIds = Array.from(new Set([...this.selectedBookIds, ...rangeIds]));
      }
    }
    else if (event.ctrlKey) {
      // Toggle selection for Ctrl+Click
      this.toggleSelection(bookId);
    } else {
      // Clear other selections and select only the clicked row
      this.selectedBookIds = [bookId];
    }
    // Update the last clicked book ID
    this.lastSelectedBookId = bookId;
  }

  // Handle right-click (context menu) to select a row
  onRowRightClick(bookId: number, event: MouseEvent): void {
    event.preventDefault(); // Prevent the default browser context menu
    // Select the book (single book or multiple books can be selected)
    if (!this.selectedBookIds.includes(bookId)) {
      this.selectedBookIds = [bookId];
    }

    // Show the context menu
    this.isContextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.contextMenu?.openMenu(event);
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

  searchCalled($event: any): void {
    console.log('Search called from top bar');
    this.fetchBooks();
  }

  onContextMenuAction(action: string): void {
    console.log('Context menu action:', action);
    const actionHandlers: { [key: string]: () => void } = {
      edit: () => this.editSelectedBooks(),
      delete: () => this.deleteSelectedBooks(),
      read: () => this.markSelectedBooks(Book.READ),
      toRead: () => this.markSelectedBooks(Book.TO_READ),
      reading: () => this.markSelectedBooks(Book.CURRENTLY_READING),
      wishlist: () => this.markSelectedBooks(Book.WISHLIST),
      collection: () => this.addSelectedBooksToCollection(),
      match: () => this.matchSelectedBooks(),
    };
    if (action in actionHandlers) {
      actionHandlers[action]();
    }
    this.isContextMenuVisible = false; // Hide the context menu after action
  }

  addSelectedBooksToCollection() {
    this.showAddToCollection = true;
  }

  matchSelectedBooks() {
    const matchMetadata = true;
    const matchCovers = true;
    // TODO save in settings which provider to use
    // open the modal for matching books
    this.multipleMatchOptions.openModal();
  }

  deleteSelectedBooks() {
    if (!confirm('Are you sure you want to delete selected books?')) {
      return;
    }
    this.booksService.deleteBooks(this.selectedBookIds).subscribe({
      next: (response) => {
        console.log('Books deleted successfully:', response);
        this.fetchBooks();
        this.selectedBookIds = [];
      },
      error: (error) => {
        console.error('Error deleting books:', error);
        // TODO Handle error appropriately, e.g., show alert https://getbootstrap.com/docs/5.3/components/alerts/
      },
    });
  }

  markSelectedBooks(status: string) {
    // action can be 'read', 'to-read', 'currently-reading', 'wishlist'
    console.log('Marking selected books as:', status);
    const bookIds = this.selectedBookIds;
    this.booksService.updateBooks(bookIds, { status: status }).subscribe({
      next: (response) => {
        console.log('Books updated successfully:', response);
        this.fetchBooks();
        this.selectedBookIds = [];
      },
      error: (error) => {
        console.error('Error updating books:', error);
        // TODO Handle error appropriately, e.g., show alert https://getbootstrap.com/docs/5.3/components/alerts/
      },
    });
  }

  closeAddToCollection() {
    this.showAddToCollection = false;
    this.selectedBookIds = []; // Clear selected books after adding to collection
    this.fetchBooks(); // Refresh the book list after adding to collection
  }

  handleCreateCollection(name: string) {
    this.collectionsService.createCollection(name).subscribe({
      next: (collection) => {
        console.log('Collection created:', collection);
        this.collections.push(collection); // Add the new collection to the list
      },
      error: (error) => {
        console.error('Error creating collection:', error);
        // TODO Handle error appropriately, e.g., show alert https://getbootstrap.com/docs/5.3/components/alerts/
      },
    });
  }

  handleAddToCollection(collectionId: number) {
    // Add books to collection logic
    this.collectionsService.addBooksToCollection(collectionId, this.selectedBookIds).subscribe({
      next: (response) => {
        console.log('Books added to collection successfully:', response);
        // close the add to collection dialog
        this.closeAddToCollection();
      },
      error: (error) => {
        console.error('Error adding books to collection:', error);
        // TODO Handle error appropriately, e.g., show alert https://getbootstrap.com/docs/5.3/components/alerts/
      },
    });
  }

  hideContextMenu(): void {
    this.isContextMenuVisible = false;
  }

  toggleColumnVisibility(column: keyof Book): void {
    const columnToUpdate = this.columns.find(col => col.value === column);

    if (columnToUpdate) {
      columnToUpdate.visible = !columnToUpdate.visible;
      const visible = columnToUpdate.visible;
      console.log(`Column ${column} visibility changed to: ${visible}`);
      this.settingsService.setBookListColumnVisibility(column, visible);
    }
  }

  private loadColumnVisibility(): void {
    const savedVisibility = this.settingsService.getBookListColumnVisibility();
    this.columns.forEach(col => {
      if (col.value in savedVisibility) {
        col.visible = savedVisibility[col.value];
      }
    });
  }

  // match multiple books 
  handleSubmitMatchBooks(event: { provider: string; updateCover: boolean; updateMetadata: boolean }): void {
    console.log('Submit clicked with options:', event);
    this.booksService.matchBooks(this.selectedBookIds, event.updateMetadata, event.updateCover, event.provider).subscribe({
      next: (response) => {
        console.log('Books matched successfully:', response);
        this.fetchBooks();
        this.selectedBookIds = [];
      },
      error: (error) => {
        console.error('Error matching books:', error);
        // TODO Handle error appropriately, e.g., show alert https://getbootstrap.com/docs/5.3/components/alerts/
      }
    });
  }

  handleCancelMatchBooks(): void {
  }

  onResizeEnd(event: any, column: any): void {
    column.width = event.rectangle.width;
    console.log(`Column "${column.name}" resized to ${column.width}px`);
  }

  getCoverImageUrl(book: Book, tiny: boolean = false): string {
    // it's possible that the book has no cover image, so we need to handle that case
    if(book.cover_image == 'placeholder_book.png')
      return this.apiService.getPlaceholderCoverUrl();
    // dunno, maybe skip tiny images altogether
    return this.apiService.getBookCoverUrl(book.id);
  }
}
