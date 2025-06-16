import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableColumn } from '../table-column';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ColumnVisibilityService {

  constructor() { }

   private columnsSubject = new BehaviorSubject<TableColumn[]>([
      {
        name: 'Title',
        value: 'title',
        visible: true,
        link: (row: any) => `/books/${row.id}`,
        queryParams: (row: Book) => ({}),
        width: 300,
      },
      {
        name: 'Author',
        value: 'author_name',
        visible: true,
        link: (row: any) => '/books',
        queryParams: (row: Book) => ({ author: row.author_name }),
        width: 150,
      },
      { name: 'Publisher', value: 'publisher', visible: true, width: 100 },
      { name: 'Year', value: 'year', visible: true },
      { name: 'Genre', value: 'genre', visible: true, width: 150 },
      { name: 'ISBN', value: 'isbn', visible: true, width: 140 },
      { name: 'Language', value: 'language', visible: true },
      { name: 'Series', value: 'series', visible: true },
      { name: 'Pages', value: 'pages', visible: true, width: 50 },
      { name: 'Rating', value: 'rating', visible: true, component: 'stars' },
      { name: 'Status', value: 'status', visible: true },
    ]);

  columns$ = this.columnsSubject.asObservable();

  toggleColumnVisibility(columnValue: string) {
    const columns = this.columnsSubject.value.map(col =>
      col.value === columnValue ? { ...col, visible: !col.visible } : col
    );
    this.columnsSubject.next(columns);
  }

  // Optional: get just the visible columns
  getVisibleColumns() {
    return this.columnsSubject.value.filter(col => col.visible);
  }
}
