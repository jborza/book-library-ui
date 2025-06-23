import { Injectable } from '@angular/core';
import { SettingsService } from '../../../core/services/settings.service';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  private _gridItemSize: number = 200;
  private readonly _gridSizeIncrement: number = 20;
  private _viewMode: 'grid' | 'table' = 'grid';
  private _showTitles: boolean = true;

  constructor(private settingsService: SettingsService) {
    // load settings from the settings service
    this._gridItemSize = this.settingsService.getBookListGridSize();
    this._viewMode = this.settingsService.getBookListViewMode();
    this._showTitles = this.settingsService.getBookListShowTitles();
  }

  get gridItemSize() {
    return this._gridItemSize;
  }
  get gridSizeIncrement() {
    return this._gridSizeIncrement;
  }
  get viewMode() {
    return this._viewMode;
  }
  get showTitles() {
    return this._showTitles;
  }

  setViewMode(mode: 'grid' | 'table') {
    this._viewMode = mode;
    this.saveSettings();
  }

  public get gridMinHeight(): number {
    if (this.showTitles) return this.gridItemSize + 60;
    else return this.gridItemSize + 20;
  }

  decrement() {
    if (this.gridItemSize > 60) {
      this._gridItemSize -= this.gridSizeIncrement;
      this.saveSettings();
    }
  }

  increment() {
    if (this.gridItemSize < 300) {
      this._gridItemSize += this.gridSizeIncrement;
      this.saveSettings();
    }
  }

  toggleShowTitles() {
    this._showTitles = !this.showTitles;
    this.saveSettings();
  }

  saveSettings() {
    this.settingsService.saveBookListSettings(
      this.viewMode,
      this.gridItemSize,
      this.showTitles,
    );
  }
}
