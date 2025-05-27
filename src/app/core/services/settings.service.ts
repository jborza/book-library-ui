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

  constructor() {
    this.loadSettings();
    this.loadCustomSearches();
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
}
