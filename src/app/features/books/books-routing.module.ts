import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookEditorComponent } from './components/book-editor/book-editor.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookMatchResultsComponent } from './components/book-match-results/book-match-results.component';
import { BookMultipleEditorComponent } from './components/book-multiple-editor/book-multiple-editor.component';
import { DuplicateTitleBookListComponent } from './components/duplicate-title-book-list/duplicate-title-book-list.component';

// first static routes, then dynamic routes
const routes: Routes = [
    { path: '', component: BookListComponent, pathMatch: 'full' }, 
    { path: 'edit_multiple', component: BookMultipleEditorComponent, pathMatch: 'full' },
    { path: 'add', component: BookEditorComponent },
    { path: 'duplicate', component: DuplicateTitleBookListComponent }, 
    { path: ':id', component: BookDetailsComponent },
    { path: ':id/edit', component: BookEditorComponent },
    { path: ':id/match', component: BookMatchResultsComponent },    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BooksRoutingModule { }