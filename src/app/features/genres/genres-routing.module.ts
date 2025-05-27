import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';

const routes: Routes = [
  { path: '', component: GenresComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenresRoutingModule {}