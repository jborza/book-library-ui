import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
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
}
