import { Injectable } from '@angular/core';
import { BookFilter } from '../../features/books/book-filter';
import { Library } from '../../features/books/library';
import { CustomSearch } from '../../features/search/models/custom-search.model'

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private static readonly STORAGE_KEY = 'userSettings';
  private static readonly CUSTOM_SEARCHES_KEY = 'customSearches'; // Key for localStorage
  private customSearches: CustomSearch[] = [];

  private static readonly LIBRARIES_KEY = 'libraries'; // Key for localStorage
  private settings: { [key: string]: any } = {};

  private static readonly BOOK_LIST_COLUMN_VISIBILITY_KEY = 'bookListColumnVisibility'; // Key for column visibility settings
  private bookListColumnVisibility: { [key: string]: boolean } = {};

  private static readonly BOOK_LIST_VIEW_MODE_KEY = 'bookListViewMode';
  private static readonly BOOK_LIST_GRID_SIZE_KEY = 'bookListGridSize';
  private static readonly BOOK_LIST_SHOW_TITLES_KEY = 'bookListShowTitles';

  constructor() {
    this.loadSettings();
    this.loadCustomSearches();
    this.loadBookListColumnVisibility();
  }

  private loadSettings(): void {
    const storedSettings = localStorage.getItem(SettingsService.STORAGE_KEY);
    this.settings = storedSettings ? JSON.parse(storedSettings) : {};
  }

  getSetting(key: string): any {
    return this.settings[key];
  }

  setSetting(key: string, value: any): void {
    this.settings[key] = value;
    this.saveSettings();
  }

  private saveSettings(): void {
    localStorage.setItem(SettingsService.STORAGE_KEY, JSON.stringify(this.settings));
  }

  getLibraries(): Library[] {
    const libraries = JSON.parse(localStorage.getItem(SettingsService.LIBRARIES_KEY) || '[]') as Record<string, BookFilter>;
    if (!libraries) {
      return [];
    }
    return Object.entries(libraries).map(([name, filter]) => ({ name, filter }));;
  }

  saveLibrary(name: string, filter: BookFilter): void {
    const libraries = JSON.parse(localStorage.getItem(SettingsService.LIBRARIES_KEY) || '{}');
    libraries[name] = filter;
    localStorage.setItem(SettingsService.LIBRARIES_KEY, JSON.stringify(libraries));
  }

  loadLibrary(name: string): BookFilter | undefined {
    const libraries = JSON.parse(localStorage.getItem(SettingsService.LIBRARIES_KEY) || '{}');
    return libraries[name];
  }

  // Get the list of custom searches
  getCustomSearches(): CustomSearch[] {
    return [...this.customSearches];
  }

  // Add a new custom search
  addCustomSearch(customSearch: CustomSearch): void {
    this.customSearches.push(customSearch);
    this.saveCustomSearches();
  }

  // Remove a custom search by title
  removeCustomSearch(title: string): void {
    this.customSearches = this.customSearches.filter(
      (search) => search.title !== title
    );
    this.saveCustomSearches();
  }

  // Save the list of custom searches to localStorage
  private saveCustomSearches(): void {
    localStorage.setItem(
      SettingsService.CUSTOM_SEARCHES_KEY,
      JSON.stringify(this.customSearches)
    );
  }

  // Load the list of custom searches from localStorage
  private loadCustomSearches(): void {
    const savedSearches = localStorage.getItem(SettingsService.CUSTOM_SEARCHES_KEY);
    if (savedSearches) {
      this.customSearches = JSON.parse(savedSearches);
    }
  }

  private loadBookListColumnVisibility(): void {
    const storedVisibility = localStorage.getItem(SettingsService.BOOK_LIST_COLUMN_VISIBILITY_KEY);
    if (storedVisibility) {
      this.bookListColumnVisibility = JSON.parse(storedVisibility);
    }
  }

  // TODO type
  private saveBookListColumnVisibility(visibility: any): void {
    localStorage.setItem(SettingsService.BOOK_LIST_COLUMN_VISIBILITY_KEY, JSON.stringify(visibility));
  }

  setBookListColumnVisibility(column: string, isVisible: boolean): void {
    this.bookListColumnVisibility[column] = isVisible;
    this.saveBookListColumnVisibility(this.bookListColumnVisibility);
  }

  // TODO use getter
  getBookListColumnVisibility(): { [key: string]: boolean } {
    return this.bookListColumnVisibility;
  }

  saveBookListSettings(viewMode: 'grid' | 'table', gridSize: number, showTitles: boolean): void {
    localStorage.setItem(SettingsService.BOOK_LIST_VIEW_MODE_KEY, viewMode);
    localStorage.setItem(SettingsService.BOOK_LIST_GRID_SIZE_KEY, gridSize.toString());
    localStorage.setItem(SettingsService.BOOK_LIST_SHOW_TITLES_KEY, JSON.stringify(showTitles));
  }

  getBookListViewMode(): 'grid' | 'table' {
    const viewMode = localStorage.getItem(SettingsService.BOOK_LIST_VIEW_MODE_KEY);
    return viewMode as 'grid' | 'table' || 'grid';
  }

  getBookListGridSize(): number {
    const gridSize = localStorage.getItem(SettingsService.BOOK_LIST_GRID_SIZE_KEY);
    return gridSize ? parseInt(gridSize, 10) : 200;
  }

  getBookListShowTitles(): boolean {
    const showTitles = localStorage.getItem(SettingsService.BOOK_LIST_SHOW_TITLES_KEY);
    return showTitles ? JSON.parse(showTitles) : true;
  }
}
