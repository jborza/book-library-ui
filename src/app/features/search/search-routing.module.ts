import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchExternalComponent } from './components/search-external/search-external.component';

const routes: Routes = [
  { path: 'external', component: SearchExternalComponent, pathMatch: 'full' }, 
  // TODO do we need a default route '/' ?
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}