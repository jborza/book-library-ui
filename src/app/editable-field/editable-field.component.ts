import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.less'],
  imports: [FormsModule, CommonModule],
})
export class EditableFieldComponent {
  @Input() currentValue!: string | undefined; // The value being edited
  @Input() originalValue!: string | undefined; // The original value for comparison
  @Input() label!: string; // The label text
  @Input() controlId!: string; // Unique ID for input and checkbox
}