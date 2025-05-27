import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; // Import reusable components, pipes, etc.
import { GenresRoutingModule } from './genres-routing.module'; // Routing for the genres module

import { GenresService } from './services/genres.service'; // Feature-specific service

@NgModule({
  declarations: [
    // Declare components belonging to this module
  ],
  imports: [
    // Import Angular modules and shared functionality
    CommonModule,
    FormsModule,
    SharedModule, // Use shared components, pipes, etc.
    GenresRoutingModule, // Genres-specific routing
  ],
  providers: [
    // Provide feature-specific services
    GenresService,
  ],
})
export class GenresModule {}