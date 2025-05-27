import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportPageComponent } from './components/import-page/import-page.component';
import { ImportResultsComponent } from './components/import-results/import-results.component';

const routes: Routes = [
  { path: '', component: ImportPageComponent },
  { path: 'results', component: ImportResultsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportRoutingModule {}