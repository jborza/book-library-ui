import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; // Import reusable components, pipes, etc.
import { AuthorsRoutingModule } from './authors-routing.module'; // Routing for the authors module

import { AuthorsService } from './services/authors.service';

@NgModule({
  declarations: [
    // Declare components belonging to this module
  ],
  imports: [
    // Import Angular modules and shared functionality
    CommonModule,
    FormsModule,
    SharedModule, // Use shared components, pipes, etc.
    AuthorsRoutingModule, // Authors-specific routing
  ],
  providers: [
    // Provide feature-specific services
    AuthorsService,
  ],
})
export class AuthorsModule {}