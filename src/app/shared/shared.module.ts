import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import reusable components, pipes, and directives
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { TagInputComponent } from './components/tag-input/tag-input.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { EditableFieldComponent } from './components/editable-field/editable-field.component';

import { TruncatePipe } from './pipes/truncate.pipe';
import { ToNumberPipe } from './pipes/to-number.pipe';

@NgModule({
  declarations: [
    // Declare shared components, directives, and pipes here
    LanguageSelectComponent,
    TagInputComponent,
    ContextMenuComponent,
    EditableFieldComponent,
    TruncatePipe,
    ToNumberPipe,
  ],
  imports: [
    // Import Angular modules commonly used in shared components
    CommonModule, // Provides Angular common directives like *ngIf and *ngFor
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Export shared components, directives, pipes, and modules so they can be used in other modules
    LanguageSelectComponent,
    TagInputComponent,
    ContextMenuComponent,
    EditableFieldComponent,
    TruncatePipe,
    ToNumberPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}