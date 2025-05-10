import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() currentValueChange = new EventEmitter<string>(); // Output to emit changes to the parent

  @Input() originalValue!: string | undefined; // The original value for comparison
  @Input() label!: string; // The label text
  @Input() controlId!: string; // Unique ID for input and checkbox

  @Input() isChecked: boolean = false; // Input for checkbox state
  @Output() isCheckedChange = new EventEmitter<boolean>(); // Output for checkbox state changes

  @Input() multiline: boolean = false;

  // Method to emit the updated value when the input changes
  onInputChange(value: string): void {
    this.currentValueChange.emit(value);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Safely cast EventTarget to HTMLInputElement
    if (inputElement) {
      this.onInputChange(inputElement.value); // Emit the value
    }
  }

  onCheckboxChange(event: Event): void {
    // Safely cast EventTarget to HTMLInputElement
    const inputElement = event.target as HTMLInputElement;
    this.isChecked = inputElement.checked;
    this.isCheckedChange.emit(this.isChecked);
    console.log('onCheckboxChange - '+this.label+" is " + this.isChecked);
  }

  // onCheckboxChange(checked: boolean): void {
  //   this.isChecked = checked;
  //   this.isCheckedChange.emit(this.isChecked);
  // }
}