import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { ImportPageComponent } from './import-page/import-page.component';
import { AuthorsComponent } from './authors/authors.component';
import { GenresComponent } from './genres/genres.component';
import { SearchComponent } from './search/search.component';
import { SearchExternalComponent } from './search-external/search-external.component';
import { TestComponent } from './test/test.component';
import { BookMatchResultsComponent } from './book-match-results/book-match-results.component';
import { ImportResultsComponent } from './import-results/import-results.component';
import { SeriesComponent } from './series/series.component';
import { SettingsComponent } from './settings/settings.component';


export const routes: Routes = [
  { path: '', component: BookListComponent, pathMatch: 'full' },
  { path: 'books', component: BookListComponent, pathMatch: 'full' },
  { path: 'books/:id', component: BookDetailsComponent },
  { path: 'books/:id/edit', component: BookEditorComponent },
  { path: 'books/:author', component: BookListComponent },
  { path: 'add', component: BookEditorComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'import', component: ImportPageComponent },
  { path: 'search', component: SearchComponent, pathMatch: 'full' },
  { path: 'search_external', component: SearchExternalComponent, pathMatch: 'full' },
  { path: 'test', component: TestComponent},
  { path: 'book/:id/match', component: BookMatchResultsComponent },
  { path: 'import_results', component: ImportResultsComponent },
  { path: 'series', component: SeriesComponent},
  { path: 'settings', component: SettingsComponent}
];