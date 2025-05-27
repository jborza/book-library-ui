import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // Declare shared components, directives, and pipes here
  ],
  imports: [
    // Import Angular modules commonly used in shared components
    CommonModule, // Provides Angular common directives like *ngIf and *ngFor
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Export shared components, directives, pipes, and modules so they can be used in other modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}