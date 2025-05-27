import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'; // Import reusable components, pipes, etc.
import { ImportRoutingModule } from './import-routing.module'; // Routing for the genres module

import { ImportService } from './services/import.service'; // Feature-specific service

@NgModule({
  declarations: [
    // Declare components belonging to this module
  ],
  imports: [
    // Import Angular modules and shared functionality
    CommonModule,
    FormsModule,
    SharedModule, // Use shared components, pipes, etc.
    ImportRoutingModule, 
  ],
  providers: [
    // Provide feature-specific services
    ImportService,
  ],
})
export class ImportModule {}