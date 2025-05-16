import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TagInputComponent } from '../tag-input/tag-input.component';

@Component({
  selector: 'app-book-multiple-editor',
  imports: [ReactiveFormsModule,
    CommonModule,
    TagInputComponent
  ],
  templateUrl: './book-multiple-editor.component.html',
  styleUrl: './book-multiple-editor.component.less'
})
export class BookMultipleEditorComponent {
  bookForm!: FormGroup;
  validationErrors: string[] = [];
  bookIds: number[] = [];
 
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];
  languages = ['English', 'German', 'Slovak', 'Czech']; // TODO add country icons
  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe((params) => {
    //   this.bookIds = params.get('id') || '';
    // });
  }

  onSubmit(action: 'save' | 'saveAndClose'): void {
    // TODO handle action 'save' - save the book and stay on the page
    if (this.bookForm.valid) {
      // Extract the form values
      const formData = this.bookForm.value;

      // Log the form data (for debugging purposes)
      console.log('Form Submitted:', formData);
    }
  }
}
