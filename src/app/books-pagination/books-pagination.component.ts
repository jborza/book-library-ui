import { CommonModule } from '@angular/common';
import { Component, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-books-pagination',
  imports: [CommonModule],
  templateUrl: './books-pagination.component.html',
  styleUrl: './books-pagination.component.less'
})
export class BooksPaginationComponent {
  @Output() pageChange: (page: number) => void = () => { };
  currentPage: number = 1;
  @Input() totalPages: number = 0;
  paginationDisplay: (number | string)[] = [];
  @Input() pageSize: number = 10; // Number of items per page
  @Input() booksLength: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['pageSize']) {
      const totalPagesChange = changes['totalPages'];
      this.totalPages = totalPagesChange.currentValue;
      this.updatePaginationDisplay();
    }
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
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page as number;
    this.updatePaginationDisplay();

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    //this.paginatedBooks = this.books.slice(startIndex, endIndex);
    this.pageChange(this.currentPage); // Emit the page change event
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.booksLength / this.pageSize);
    this.updatePaginationDisplay();
    this.changePage(1); // Set the first page as default
  }

}
