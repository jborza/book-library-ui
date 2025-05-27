import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookDataService } from '../../services/book-data.service'
import { Book } from '../../models/book.model'
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { TagInputComponent } from '../../../../shared/components/tag-input/tag-input.component';
import { ApiService } from '../../../../core/services/api.service';
import { ThumbnailsService } from '../../../../core/services/thumbnails.service';
import { LanguageSelectComponent } from '../../../../shared/components/language-select/language-select.component';

@Component({
  selector: 'app-book-editor',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputComponent,
    LanguageSelectComponent,
  ],
  templateUrl: './book-editor.component.html',
  styleUrl: './book-editor.component.less',
})
export class BookEditorComponent implements OnInit {
  bookId: string | null = null;
  book!: Book;
  originalBook!: Book;
  searchBook!: any; // should it be also Book?
  editMode: boolean = false;
  bookForm!: FormGroup;
  validationErrors: string[] = [];
  returnUrl: string;

  languages = [
    { value: 'en', label: '🇬🇧 English' },
    { value: 'de', label: '🇩🇪 German' },
    { value: 'sk', label: '🇸🇰 Slovak' },
    { value: 'cz', label: '🇨🇿 Czech' },
  ];
  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];

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

  constructor(
    private route: ActivatedRoute,
    private bookDataService: BookDataService,
    private booksService: BooksService,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private thumbnailService: ThumbnailsService
  ) {
    this.returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || '/books';
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: [[], Validators.required], // Tag input for authors
      year: [null, [Validators.min(1000), Validators.max(9999)]],
      series: [''],
      description: [''],
      notes: [''], 
      genres: [[]], // Tag input for genres
      tags: [[]], // Tag input for tags
      isbn: ['', [Validators.pattern(/^\d{10}(\d{3})?$/)]], // ISBN-10 or ISBN-13
      status: [''], // Book status
      rating: [null, [Validators.min(1), Validators.max(5)]],
      publisher: [''],
      language: [''], // Default language
      pages: [null, [Validators.min(1)]],
      type: ['Ebook'], // Book type
      coverImage: [''],
    });
    this.bookId = this.route.snapshot.paramMap.get('id');
    // load book data from the service
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    } else {
      // if we're in add mode, create a new book object
      this.book = new Book({});
      this.originalBook = new Book({});
    }
    // if we come in from book match results, pre-fill the form with the selected book
    this.bookDataService.selectedBook$.subscribe((searchBook) => {
      if (searchBook) {
        // Use the selected book data to populate your form
        this.searchBook = searchBook;

        console.log('Search Book:', searchBook);
        // now apply search book fields to the book object
        // sometimes this.book is undefined ?!
        if (!this.book) {
          console.error('Book is undefined');
          return;
        }
        console.log('setting title to:', searchBook.title + ' on ' + this.book);
        this.updateBookFromSearch();
        this.bookDataService.clearSelectedBook();
      }
    });
    // replace decimal comma with decimal point in rating input
    this.bookForm.get('rating')?.valueChanges.subscribe((value) => {
      if (typeof value === 'string' && value.includes(',')) {
        // Replace decimal comma with decimal point
        const transformedValue = value.replace(',', '.');

        // Update the `rating` control with the transformed value
        this.bookForm.get('rating')?.setValue(transformedValue, {
          emitEvent: false, // Prevent infinite loop
        });
      }
    });
  }

  private updateBookFromSearch() {
    if (this.searchBook === undefined) {
      return;
    }
    const searchBook = this.searchBook;
    if (searchBook.title) this.book.title = searchBook.title;
    if (searchBook.author_name) this.book.author_name = searchBook.author_name;
    if (searchBook.isbn) this.book.isbn = searchBook.isbn;
    if (searchBook.publisher) this.book.publisher = searchBook.publisher;
    if (searchBook.year_published) this.book.year = searchBook.year_published;
    if (searchBook.language) this.book.language = searchBook.language;
    if (searchBook.page_count) this.book.pages = searchBook.page_count;
    if (searchBook.synopsis) this.book.synopsis = searchBook.synopsis;
    if (searchBook.genre) this.book.genre = searchBook.genre;
    // genre can be a list of genres
    if (Array.isArray(searchBook.genre)) {
      this.book.genre = searchBook.genre.join(', ');
    }
    if (searchBook.cover_image) this.book.cover_image = searchBook.cover_image;

    this.updateBookForm(this.book);
  }

  updateBookForm(book: Book) {
    const displayStatus =
      this.statusMapping[book.status ?? 'to-read'] || 'To Read';
    const displayLanguage =
      this.languageMapping[book.language ?? 'en'] || 'English';
    const displayType = this.typeMapping[book.book_type ?? 'ebook'] || 'Ebook';
    // genres can be a list of genres
    const genres = [book.genre?.split(', ') ?? []].flat();

    this.bookForm.patchValue({
      title: book.title,
      author: book.author_name ?? [],
      year: book.year,
      series: book.series,
      description: book.synopsis,
      genres: genres,
      tags: book.tags ?? [],
      isbn: book.isbn,
      publisher: book.publisher,
      language: displayLanguage,
      status: displayStatus,
      pages: book.pages,
      rating: book.rating,
      type: displayType,
      coverImage: book.cover_image,
      notes: book.notes,
    });
  }

  fetchBookDetails(bookId: string) {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.editMode = true;
      // patch year, pages
      data.year = data.year_published;
      data.pages = data.page_count;
      this.book = data;
      console.log('Book:', this.book);
      this.originalBook = { ...data }; // Create a copy of the original book data
      // now apply search match book fields to the book object
      this.updateBookFromSearch();
      this.updateBookForm(this.book);
    });
  }

  // Getter for the image URL
  get coverImageUrl(): string {
    const coverImage = this.bookForm.get('coverImage')?.value;
    if (coverImage?.startsWith('covers/')) {
      // Prepend the base path for saved URLs
      return this.apiService.getImageUrl(coverImage);
    }
    // Return the external URL as-is
    return coverImage || '';
  }

  // Update the book object dynamically when a field changes
  onFieldChange<K extends keyof Book>(field: K, value: Book[K]): void {
    this.book[field] = value; // Dynamically update the field
  }

  createBook(book: Book): void {
    // POST request to create a new book
    // book/create_api, POST the data
    this.booksService.createBook(book).subscribe({
      next: (response) => {
        console.log('Book created successfully:', response);
        this.book.id = response.id; // Assuming the API returns the created book with its ID
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        // navigate back to where the user came from
        this.router.navigateByUrl(this.returnUrl);
      },
    });
  }

  saveBook(book: Book): void {
    // POST request to save the book
    // book/BOOK_ID/edit_api, POST the data
    this.booksService.saveBook(book).subscribe({
      next: (response) => {
        console.log('Book saved successfully:', response);
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        // navigate back to where the user came from
        this.router.navigateByUrl(this.returnUrl);
      },
    });
  }

  onSubmit(action: 'save' | 'saveAndClose'): void {
    // TODO handle action 'save' - save the book and stay on the page
    if (this.bookForm.valid) {
      // Extract the form values
      const formData = this.bookForm.value;

      // Log the form data (for debugging purposes)
      console.log('Form Submitted:', formData);

      // convert the form data to the book object
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
      const saveData = {
        ...formData,
        id: this.book.id,
        status: dbStatus,
        book_type: dbType,
        language: dbLanguage,
        genre: dbGenres,
        tags: dbTags,
        year: formData.year,
        author_name: formData.author,
        synopsis: formData.description,
        cover_image: formData.coverImage,
        page_count: formData.pages,
        notes: formData.notes,
      };
      // this feels like a hack, find a better way to store cover image urls
      if (this.book.cover_image) {
        saveData.cover_image = this.book.cover_image;
      }
      if (this.book.cover_image_tiny) {
        saveData.cover_image_tiny = this.book.cover_image_tiny;
      }

      // Call the backend API to save the data
      // if new book, create it
      if (!this.editMode) {
        this.createBook(saveData);
      } else {
        this.saveBook(saveData);
      }
    } else {
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
      title: 'Title',
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

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // upload the image
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.thumbnailService.uploadImage(formData).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          // Update the cover image URL in the form
          const largeImageUrl = response.file_path;
          const tinyImageUrl = response.file_path_tiny;
          this.book.cover_image = largeImageUrl;
          this.book.cover_image_tiny = tinyImageUrl;
        },
        error: (error) => {
          console.error('Error occurred while uploading image:', error);
        },
      });
    }
  }
}
