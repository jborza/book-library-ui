import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagInputComponent),
      multi: true
    }
  ]
})
export class TagInputComponent {
  @Input() placeholder: string = 'Add a tag';
  @Output() tagsChange = new EventEmitter<string[]>();

  tags: string[] = [];
  newTag: string = '';

  // Triggered when the input loses focus
  onBlur(): void {
    this.addTag();
  }

  onChange: (tags: string[]) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(tags: string[]): void {
    this.tags = tags || [];
  }

  registerOnChange(fn: (tags: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  addTag(): void {
    const trimmedTag = this.newTag.trim();
    if (trimmedTag && !this.tags.includes(trimmedTag)) {
      this.tags.push(trimmedTag);
      this.onChange(this.tags);
      this.tagsChange.emit(this.tags);
    }
    this.newTag = '';
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
    this.onChange(this.tags);
    this.tagsChange.emit(this.tags);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
  }
}
