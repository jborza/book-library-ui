import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PingService } from '../core/services/ping.service';
import { MenuService } from '../features/menu/services/menu.service';
import { BookSearchService } from '../features/books/services/book-search.service';
import { BookListService } from '../features/books/services/book-list.service';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.less',
})
export class TopBarComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchCalled = new EventEmitter<void>();
  pingStatus: boolean = false;

  constructor(
    private pingService: PingService,
    private menuService: MenuService,
    private bookSearchService: BookSearchService,
    public bookListService: BookListService
  ) {
    pingService.pingCalled.subscribe((response) => {
      this.pingStatus = response;
    });
    bookSearchService.searchValue$.subscribe((value) => {
      this.searchText = value; // Update searchText when the service emits a new value
    });
  }

  onSearch() {
    console.log('Search triggered with:', this.searchText);
    this.searchCalled.emit(); // Emit search event
  }

  showHideMenu(): void {
    this.menuService.toggleMenu();
  }

  decrement() {
    this.bookListService.decrement();
  }

  increment() {
    this.bookListService.increment();
  }

  get isGridView(): boolean {
    return this.bookListService.viewMode === 'grid';
  }

  selectGrid(): void {
    this.bookListService.setViewMode('grid');
  }

  selectTable(): void {
    this.bookListService.setViewMode('table');
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
    this.bookSearchService.setSearchValue(inputElement.value);
  }

  pingResponse() {
    return this.pingStatus ? '✅' : '❌';
  }

  get pingTooltipText() {
    return this.pingStatus ? 'Backend is up' : 'Backend is down';
  }
}
