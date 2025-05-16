import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputComponent } from '../tag-input/tag-input.component';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';

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
  languages = ['', 'English', 'German', 'Slovak', 'Czech']; // TODO add country icons
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
      author: [[], Validators.required], // Tag input for authors
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
    // TODO handle action 'save' - save the book and stay on the page
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
          changedItems['genres'] = genres;
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
  }
}
