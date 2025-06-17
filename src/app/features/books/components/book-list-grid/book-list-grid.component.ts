import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { TableColumn } from '../../table-column';
import { ColumnVisibilityService } from '../../services/column-visibility.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'book-list-grid',
  imports: [CommonModule],
  templateUrl: './book-list-grid.component.html',
  styleUrl: './book-list-grid.component.less'
})
export class BookListGridComponent {
@Input() books: Book[] = [];
  currentUrl: string;
  columns$;
  columns: TableColumn[] = [];

  @Input() selectedBookIds: number[] = [];
  @Input() allSelected = false;

  @Output() rowClick = new EventEmitter<{ bookId: number, event: MouseEvent }>();
  @Output() rowRightClick = new EventEmitter<{ bookId: number, event: MouseEvent }>();
  @Output() sort = new EventEmitter<{ column: string, event: MouseEvent }>();

    constructor(
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

  onRowClick(book: Book, event: MouseEvent) {
    this.rowClick.emit({ bookId: book.id, event });
  }
  onRowRightClick(book: Book, event: MouseEvent) {
    event.preventDefault();
    this.rowRightClick.emit({ bookId: book.id, event });
  }
}
