import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesComponent } from './components/series/series.component';

const routes: Routes = [
  { path: '', component: SeriesComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesRoutingModule {}