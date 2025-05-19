import { Injectable } from '@angular/core';
import { BookFilter } from './book-filter';
import { Library } from './library';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly STORAGE_KEY = 'userSettings';

  private settings: { [key: string]: any } = {};

  constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    const storedSettings = localStorage.getItem(this.STORAGE_KEY);
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
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings));
  }

  getLibraries(): Library[] {
    const libraries = JSON.parse(localStorage.getItem('libraries') || '[]');
    if (!libraries) {
      return [];
    }
    const keys = Object.keys(libraries);
    const values = Object.values(libraries);
    const result: Library[] = keys.map((key, index) => ({
      name: key,
      filter: String(values[index]),
    }));
    return result;
  }

  saveLibrary(name: string, filter: BookFilter) {
    const libraries = JSON.parse(localStorage.getItem('libraries') || '{}');
    libraries[name] = filter;
    localStorage.setItem('libraries', JSON.stringify(libraries));
  }

  loadLibrary(name: string): BookFilter | undefined {
    const libraries = JSON.parse(localStorage.getItem('libraries') || '{}');
    return libraries[name];
  }
}
