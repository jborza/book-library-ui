import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookListService {
  gridItemSize: number = 200;
  readonly gridSizeIncrement: number = 20;
  // TODO save this in settings
  viewMode: 'grid' | 'table' = 'grid';

  constructor() {}

  setViewMode(mode: 'grid' | 'table') {
    this.viewMode = mode;
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
}
