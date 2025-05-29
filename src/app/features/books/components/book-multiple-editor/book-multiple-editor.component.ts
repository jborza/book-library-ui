import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputComponent } from '../../../../shared/components/tag-input/tag-input.component';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-multiple-editor',
  imports: [ReactiveFormsModule, CommonModule, TagInputComponent],
  templateUrl: './book-multiple-editor.component.html',
  styleUrl: './book-multiple-editor.component.less',
})
export class BookMultipleEditorComponent {
  bookForm!: FormGroup;
  validationErrors: string[] = [];
  bookIds: number[] = [];

  bookTypes = ['', 'Ebook', 'Audiobook', 'Physical Book'];
  languages = ['', 'English', 'German', 'Slovak', 'Czech']; 
  statuses = ['', 'Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const bookIdsString = params.get('id');
      if (bookIdsString) {
        this.bookIds = bookIdsString.split(',').map((id) => parseInt(id));
      }
    });
    this.bookForm = this.fb.group({
      author: [''],
      year: [null, [Validators.min(1000), Validators.max(9999)]],
      series: [''], // Tag input for series
      description: [''],
      genres: [[]], // Tag input for genres
      tags: [[]], // Tag input for tags
      isbn: ['', [Validators.pattern(/^\d{10}(\d{3})?$/)]], // ISBN-10 or ISBN-13
      status: [''], // Book status
      rating: [null, [Validators.min(1), Validators.max(5)]],
      publisher: [''],
      language: [''], // Default language
      pages: [null, [Validators.min(1)]],
      type: [''], // Book type
    });
  }

  private statusMapping: Record<string, string> = {
    'to-read': 'To Read',
    read: 'Read',
    'currently-reading': 'Reading',
    wishlist: 'Wish List',
    abandoned: 'Abandoned',
  };

  private reverseStatusMapping: Record<string, string> = Object.entries(
    this.statusMapping
  ).reduce((acc, [dbValue, displayValue]) => {
    acc[displayValue] = dbValue;
    return acc;
  }, {} as Record<string, string>);

  private typeMapping: Record<string, string> = {
    ebook: 'Ebook',
    physical: 'Physical Book',
    audiobook: 'Audiobook',
  };

  private reverseTypeMapping: Record<string, string> = Object.entries(
    this.typeMapping
  ).reduce((acc, [dbValue, displayValue]) => {
    acc[displayValue] = dbValue;
    return acc;
  }, {} as Record<string, string>);

  private languageMapping: Record<string, string> = {
    en: 'English',
    de: 'German',
    sk: 'Slovak',
    cs: 'Czech',
    english: 'English',
    german: 'German',
    slovak: 'Slovak',
    czech: 'Czech',
    eng: 'English',
    ger: 'German',
    skl: 'Slovak',
    cze: 'Czech',
  };

  private reverseLanguageMapping: Record<string, string> = Object.entries(
    this.languageMapping
  ).reduce((acc, [dbValue, displayValue]) => {
    acc[displayValue] = dbValue;
    return acc;
  }, {} as Record<string, string>);

  onSubmit(action: 'save' | 'saveAndClose'): void {
    if (this.bookForm.valid) {
      // Extract the form values
      const formData = this.bookForm.value;
      // see which items were changed
      // item by item?
      const dbStatus = this.reverseStatusMapping[formData.status];
      const dbType = this.reverseTypeMapping[formData.type];
      const dbLanguage = this.reverseLanguageMapping[formData.language];
      const dbGenres = formData.genres
        .map((genre: string) => genre.trim())
        .join(', '); // Join genres with commas
      // tags can be a list of tags
      const dbTags = Array.isArray(formData.tags)
        ? formData.tags.map((tag: string) => tag.trim()).join(', ')
        : formData.tags;

      let changedItems: { [key: string]: any } = {};
      if (formData.author) {
        changedItems['author_name'] = formData.author;
      }
      if (formData.year) {
        changedItems['year'] = formData.year;
      }
      if (formData.series) {
        changedItems['series'] = formData.series;
      }
      if (formData.description) {
        changedItems['synopsis'] = formData.description;
      }
      if (formData.genres) {
        const genres = dbGenres;
        if (genres.length > 0) {
          changedItems['genre'] = genres;
        }
      }
      if (formData.tags) {
        const tags = dbTags;;
        if (tags.length > 0) {
          changedItems['tags'] = tags;
        }
      }
      if (formData.isbn) {
        changedItems['isbn'] = formData.isbn;
      }
      if (formData.status) {
        changedItems['status'] = dbStatus;
      }
      if (formData.rating) {
        changedItems['rating'] = formData.rating;
      }
      if (formData.publisher) {
        changedItems['publisher'] = formData.publisher;
      }
      if (formData.language) {
        changedItems['language'] = dbLanguage;
      }
      if (formData.pages) {
        changedItems['page_count'] = formData.pages;
      }
      if (formData.type) {
        changedItems['book_type'] = dbType;
      }

      console.log('Changed Items:', changedItems);
      // send the changed items to the backend
      // maybe make a Book?
      this.booksService.updateBooks(this.bookIds, changedItems).subscribe({
        next: (response) => {
          console.log('Book saved successfully:', response);
        },
        error: (error) => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          // navigate back to where the user came from
          this.location.back();
        },
      });

      // Log the form data (for debugging purposes)
      console.log('Form Submitted:', formData);
    }
    else{
      // Mark all controls as touched to display validation errors
      this.bookForm.markAllAsTouched();
      this.validationErrors = this.getAllValidationErrors();
      console.log('Form is invalid. Please fix the errors.');
    }
  }

  private getAllValidationErrors(): string[] {
    const errors: string[] = [];

    Object.keys(this.bookForm.controls).forEach((controlName) => {
      const control = this.bookForm.get(controlName);

      if (control && control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          const errorMessage = this.getErrorMessage(
            controlName,
            errorKey,
            control.errors![errorKey]
          );
          if (errorMessage) {
            errors.push(errorMessage);
          }
        });
      }
    });

    return errors;
  }

  private getErrorMessage(
    controlName: string,
    errorKey: string,
    errorValue: any
  ): string | null {
    const controlLabels: Record<string, string> = {
      authors: 'Author',
      year: 'Publish Year',
      isbn: 'ISBN',
      series: 'Series',
      description: 'Description',
      genres: 'Genres',
      tags: 'Tags',
      status: 'Status',
      rating: 'Rating',
      publisher: 'Publisher',
    };

    console.log('Control Name:', controlName);
    console.log('Error Key:', errorKey);
    const errorMessages: Record<string, string> = {
      required: `${controlLabels[controlName]} is required.`,
      maxlength: `${controlLabels[controlName]} must not exceed ${errorValue.requiredLength} characters.`,
      minlength: `${controlLabels[controlName]} must be at least ${errorValue.requiredLength} characters.`,
      pattern: `${controlLabels[controlName]} format is invalid.`,
      min: `${controlLabels[controlName]} must be at least ${errorValue.min}.`,
      max: `${controlLabels[controlName]} must be at most ${errorValue.max}.`,
    };

    return errorMessages[errorKey] || null;
  }
}
