import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { ToNumberPipe } from '../../../../shared/pipes/to-number.pipe';
import { Book } from '../../models/book.model';
import { ApiService } from '../../../../core/services/api.service';
import { TableColumn } from '../../table-column';
import { ColumnVisibilityService } from '../../services/column-visibility.service';

@Component({
  selector: 'book-list-table',
  imports: [CommonModule, RouterModule, ToNumberPipe],
  templateUrl: './book-list-table.component.html',
  styleUrl: './book-list-table.component.less',
})
export class BookListTableComponent {
  globalString = String;
  currentUrl: string;

  //resizing
  private isResizing: boolean = false;
  private currentColumn: number = -1;
  private startX: number = 0;
  private startWidth: number = 0;

  // inputs
  @Input() books: Book[] = [];
  @Input() selectedBookIds: number[] = [];
  @Input() sortColumn: string = '';
  @Input() sortDirection: boolean = true; // true = ascending, false = descending
  @Input() allSelected: boolean = false;

  @Output() sort = new EventEmitter<{ column: string; event: MouseEvent }>();
  @Output() selectionChange = new EventEmitter<number>();
  @Output() toggleAll = new EventEmitter<boolean>();
  @Output() rowClick = new EventEmitter<{
    bookId: number;
    event: MouseEvent;
  }>();
  @Output() rowRightClick = new EventEmitter<{
    bookId: number;
    event: MouseEvent;
  }>();

  columns$;
  columns: TableColumn[] = [];

  /*{
    name: string;
    value: keyof Book;
    visible: boolean;
    link?: (row: Book) => string;
    queryParams?: (row: Book) => Params;
    component?: string;
    width?: number;
  }*/
  // columns: TableColumn[] = [
  //   {
  //     name: 'Title',
  //     value: 'title',
  //     visible: true,
  //     link: (row: any) => `/books/${row.id}`,
  //     queryParams: (row: Book) => ({}),
  //     width: 300,
  //   },
  //   {
  //     name: 'Author',
  //     value: 'author_name',
  //     visible: true,
  //     link: (row: any) => '/books',
  //     queryParams: (row: Book) => ({ author: row.author_name }),
  //     width: 150,
  //   },
  //   { name: 'Publisher', value: 'publisher', visible: true, width: 100 },
  //   { name: 'Year', value: 'year', visible: true },
  //   { name: 'Genre', value: 'genre', visible: true, width: 150 },
  //   { name: 'ISBN', value: 'isbn', visible: true, width: 140 },
  //   { name: 'Language', value: 'language', visible: true },
  //   { name: 'Series', value: 'series', visible: true },
  //   { name: 'Pages', value: 'pages', visible: true, width: 50 },
  //   { name: 'Rating', value: 'rating', visible: true, component: 'stars' },
  //   { name: 'Status', value: 'status', visible: true },
  // ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private columnVisibilityService: ColumnVisibilityService
  ) {
    this.currentUrl = router.url;
    this.columns$ = this.columnVisibilityService.columns$;
    this.columnVisibilityService.columns$.subscribe((cols) => {
      this.columns = cols;
    });
  }

  getCoverImageUrl(book: Book, tiny: boolean = false): string {
    // it's possible that the book has no cover image, so we need to handle that case
    if (book.cover_image == 'placeholder_book.png')
      return this.apiService.getPlaceholderCoverUrl();
    // dunno, maybe skip tiny images altogether
    return this.apiService.getBookCoverUrl(book.id);
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

  private isNearRightEdge(event: MouseEvent): boolean {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const rightEdgeZone = 10; // 10px zone for resize
    return event.clientX > rect.right - rightEdgeZone;
  }

  // TODO save column widths to settings
  private saveColumnWidths() {
    const widths = this.columns.map((col) => ({
      value: col.value,
      width: col.width,
    }));
    // TODO save
  }

  // TODO load column widths from settings
  private loadColumnWidths() {}

  onSort(col: string, event: MouseEvent) {
    this.sort.emit({ column: col, event });
  }

  onToggleSelection(bookId: number) {
    this.selectionChange.emit(bookId);
  }

  onToggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleAll.emit(checked);
  }

  onRowClick(bookId: number, event: MouseEvent) {
    this.rowClick.emit({ bookId, event });
  }

  onRowRightClick(bookId: number, event: MouseEvent) {
    event.preventDefault(); // Prevents default browser context menu
    this.rowRightClick.emit({ bookId, event });
  }
}
