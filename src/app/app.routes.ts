import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';


export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, // Redirect to books on empty path
  {
    path: 'books', loadChildren: () =>
      import('./features/books/books.module').then((m) => m.BooksModule), // Lazy-load BooksModule
  },
  {
    path: 'authors', loadChildren: () =>
      import('./features/authors/authors.module').then((m) => m.AuthorsModule), // Lazy-load AuthorsModule 
  },
  {
    path: 'genres', loadChildren: () =>
      import('./features/genres/genres.module').then((m) => m.GenresModule), // Lazy-load GenresModule
  },
  {
    path: 'search', loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule), // Lazy-load SearchModule
  },
  {
    path: 'import', loadChildren: () =>
      import('./features/import/import.module').then((m) => m.ImportModule), // Lazy-load ImportModule
  },
  {
    path: 'series', loadChildren: () =>
      import('./features/series/series.module').then((m) => m.SeriesModule), // Lazy-load SeriesModule
  },
  {
    path: 'settings', loadChildren: () =>
      import('./features/settings/settings.module').then((m) => m.SettingsModule), // Lazy-load SettingsModule
  },
  {
    path: 'collections', loadChildren: () =>
      import('./features/collections/collections.module').then((m) => m.CollectionsModule), // Lazy-load CollectionsModule
  },
  { path: 'test', component: TestComponent },
];