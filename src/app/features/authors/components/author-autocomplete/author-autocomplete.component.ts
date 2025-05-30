import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-author-autocomplete',
  imports: [FormsModule,
    CommonModule
  ],
  templateUrl: './author-autocomplete.component.html',
  styleUrl: './author-autocomplete.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorAutocompleteComponent),
      multi: true,
    },
  ],
})
export class AuthorAutocompleteComponent implements ControlValueAccessor {
  @Input() authors: string[] = []; // List of authors passed as input
  @Input() placeholder: string = 'Search for an author';

  // Input and filtered authors
  authorInput: string = '';
  filteredAuthors: string[] = [];
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  dropdownOpen = false;

  constructor(private elementRef: ElementRef) { }

  // Listen for clicks anywhere in the document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.filteredAuthors = [];
    }
  }

  // Filter authors based on input
  onInputChange(): void {
    const query = this.authorInput.toLowerCase();
    this.filteredAuthors = this.authors.filter((author) =>
      author.toLowerCase().includes(query)
    );
    this.onChange(this.authorInput);
  }

  // Select an author from the list
  selectAuthor(author: string): void {
    this.authorInput = author; // Set the selected author in the input box
    this.filteredAuthors = []; // Clear the dropdown
    this.onChange(author); // Notify Angular form about the selection
    this.onTouched(); // Mark as touched
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    this.authorInput = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
