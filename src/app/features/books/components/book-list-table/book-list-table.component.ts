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

  staticColumnsWidth: number = 72;
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

  ngOnInit() {
    // Load initial column visibility settings
    this.loadColumnWidths();
    this.setupResizeListeners();
  }

  get visibleColumns(): TableColumn[] {
    return this.columns.filter((col) => col.visible);
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

  getCoverImageUrl(book: Book, tiny: boolean = false): string {
    // it's possible that the book has no cover image, so we need to handle that case
    if (book.cover_image == 'placeholder_book.png')
      return this.apiService.getPlaceholderCoverUrl();
    // dunno, maybe skip tiny images altogether
    return this.apiService.getBookCoverUrl(book.id);
  }

  onMouseDown(event: MouseEvent, columnIndex: number) {
    console.log('onMouseDown', event, columnIndex);
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
    console.log('isNearRightEdge', event);
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

  get tableWidthPx(): number {
    return (
      this.visibleColumns.reduce((sum, col) => sum + (col.width || 100), 0) +
      this.staticColumnsWidth
    ); // Add widths of static columns
  }
}
