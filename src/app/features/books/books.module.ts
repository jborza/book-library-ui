import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; // Import reusable components, pipes, etc.
import { BooksRoutingModule } from './books-routing.module'; // Routing for the books module

import { BooksService } from './services/books.service'; // Feature-specific service

@NgModule({
  declarations: [
    // Declare components belonging to this module
  ],
  imports: [
    // Import Angular modules and shared functionality
    CommonModule,
    FormsModule,
    SharedModule, // Use shared components, pipes, etc.
    BooksRoutingModule, // Books-specific routing
  ],
  providers: [
    // Provide feature-specific services
    BooksService,
  ],
})
export class BooksModule {}