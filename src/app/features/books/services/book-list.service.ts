import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  gridItemSize: number = 120;
  readonly gridSizeIncrement: number = 20;
  // TODO save this in settings
  viewMode: 'grid' | 'table' = 'grid';

  constructor() { }
}
