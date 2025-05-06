import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { ImportPageComponent } from './import-page/import-page.component';

export const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'books/:id/edit', component: BookEditorComponent },
  { path: 'import', component: ImportPageComponent },
];