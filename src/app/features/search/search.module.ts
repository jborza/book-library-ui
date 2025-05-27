import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; // Import reusable components, pipes, etc.
import { SearchRoutingModule } from './search-routing.module'; // Routing for the genres module

import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    // Declare components belonging to this module
  ],
  imports: [
    // Import Angular modules and shared functionality
    CommonModule,
    FormsModule,
    SharedModule, // Use shared components, pipes, etc.
    SearchRoutingModule, // Genres-specific routing
  ],
  providers: [
    // Provide feature-specific services
    SearchService
  ],
})
export class SearchModule {}