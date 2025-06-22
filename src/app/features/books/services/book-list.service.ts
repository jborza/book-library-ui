import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  // TODO save this in settings
  gridItemSize: number = 200;
  readonly gridSizeIncrement: number = 20;
  viewMode: 'grid' | 'table' = 'grid';
  showTitles: boolean = true;

  constructor() {}

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
  }

  public get gridMinHeight(): number {
    if (this.showTitles) return this.gridItemSize + 60;
    else return this.gridItemSize+20;
  }

  decrement() {
    if (this.gridItemSize > 60) {
      this.gridItemSize -= this.gridSizeIncrement;
    }
  }

  increment() {
    if (this.gridItemSize < 300) {
      this.gridItemSize += this.gridSizeIncrement;
    }
  }

  toggleShowTitles() {
    this.showTitles = !this.showTitles;
  }
}
