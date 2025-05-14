import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BookDataService } from '../book-data.service';
import { Book } from '../book.model';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../books.service';
import { EditableFieldComponent } from '../editable-field/editable-field.component';
import { Router } from '@angular/router';
import { TagInputComponent } from '../tag-input/tag-input.component';

// TODO convert rating entered like 4,6 to 4.6

@Component({
  selector: 'app-book-editor',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditableFieldComponent,
    TagInputComponent],
  templateUrl: './book-editor.component.html',
  styleUrl: './book-editor.component.less'
})
export class BookEditorComponent implements OnInit {
  bookId: string | null = null;
  book!: Book;
  originalBook!: Book;
  searchBook!: any; // should it be also Book?
  selectAllChecked: boolean = false;
  editMode: boolean = false;
  bookForm!: FormGroup;

  languages = ['English', 'German', 'Slovak', 'Czech']; // TODO add country icons
  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];

  private statusMapping: Record<string, string> = {
    'to-read': 'To Read',
    'read': 'Read',
    'currently-reading': 'Reading',
    'wishlist': 'Wish List',
    'abandoned': 'Abandoned'
  };

  private reverseStatusMapping: Record<string, string> = Object.entries(this.statusMapping).reduce(
    (acc, [dbValue, displayValue]) => {
      acc[displayValue] = dbValue;
      return acc;
    },
    {} as Record<string, string>
  );

  private typeMapping: Record<string, string> = {
    'ebook': 'Ebook',
    'physical': 'Physical Book',
    'audiobook': 'Audiobook',
  };

  private reverseTypeMapping: Record<string, string> = Object.entries(this.typeMapping).reduce(
    (acc, [dbValue, displayValue]) => {
      acc[displayValue] = dbValue;
      return acc;
    },
    {} as Record<string, string>
  );

  private languageMapping: Record<string, string> = {
    'en': 'English',
    'de': 'German',
    'sk': 'Slovak',
    'cs': 'Czech',
    'english': 'English',
    'german': 'German',
    'slovak': 'Slovak',
    'czech': 'Czech',
    'eng': 'English',
    'ger': 'German',
    'skl': 'Slovak',
    'cze': 'Czech',
  };

  private reverseLanguageMapping: Record<string, string> = Object.entries(this.languageMapping).reduce(
    (acc, [dbValue, displayValue]) => {
      acc[displayValue] = dbValue;
      return acc;
    },
    {} as Record<string, string>
  );

  @ViewChildren(EditableFieldComponent) editableFields!: QueryList<EditableFieldComponent>;

  constructor(private route: ActivatedRoute,
    private bookDataService: BookDataService,
    private booksService: BooksService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: [[], Validators.required], // Tag input for authors
      publishYear: [null, [Validators.min(1000), Validators.max(9999)]],
      series: [[]], // Tag input for series
      description: [''],
      genres: [[]], // Tag input for genres
      tags: [[]], // Tag input for tags
      isbn: ['', [Validators.pattern(/^\d{10}(\d{3})?$/)]], // ISBN-10 or ISBN-13
      status: [''], // Book status
      rating: [null, [Validators.min(1), Validators.max(5)]],
      publisher: [''],
      language: ['English'], // Default language
      pages: [null, [Validators.min(1)]],
      type: ['Ebook'], // Book type
    });
    this.bookId = this.route.snapshot.paramMap.get('id');
    // load book data from the service
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
    else {
      // if we're in add mode, create a new book object
      this.book = new Book({});
      this.originalBook = new Book({});
    }
    // if we come in from book match results, pre-fill the form with the selected book
    this.bookDataService.selectedBook$.subscribe(searchBook => {
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
        console.log('setting title to:', searchBook.title + " on " + this.book);
        this.updateBookFromSearch();
        this.bookDataService.clearSelectedBook();
      }
    });
  }

  resetForm(): void {
    this.bookForm.reset({
      title: '',
      subtitle: '',
      authors: [],
      publishYear: null,
      series: [],
      description: '',
      genres: [],
      tags: [],
      narrators: [],
      isbn: '',
      asin: '',
      publisher: '',
      language: 'English',
      explicit: false,
      abridged: false
    });
  }

  private updateBookFromSearch() {
    if (this.searchBook === undefined) {
      return;
    }
    const searchBook = this.searchBook;
    if (searchBook.title)
      this.book.title = searchBook.title;
    if (searchBook.author_name)
      this.book.author_name = searchBook.author_name;
    if (searchBook.isbn)
      this.book.isbn = searchBook.isbn;
    if (searchBook.publisher)
      this.book.publisher = searchBook.publisher;
    if (searchBook.year_published)
      this.book.year = searchBook.year_published;
    if (searchBook.language)
      this.book.language = searchBook.language;
    if (searchBook.page_count)
      this.book.pages = searchBook.page_count;
    if (searchBook.synopsis)
      this.book.synopsis = searchBook.synopsis;
    if (searchBook.genre)
      this.book.genre = searchBook.genre;
    // genre can be a list of genres
    if (Array.isArray(searchBook.genre)) {
      this.book.genre = searchBook.genre.join(', ');
    }
    if (searchBook.cover_image)
      this.book.cover_image = searchBook.cover_image;
    console.log('Setting genre:', this.book.genre);
  }

  updateBookForm(book: Book) {
    const displayStatus = this.statusMapping[book.status ?? 'to-read'] || 'To Read';
    const displayLanguage = this.languageMapping[book.language ?? 'en'] || 'English';
    const displayType = this.typeMapping[book.book_type ?? 'ebook'] || 'Ebook';
    // genres can be a list of genres
    // TODO split by comma
    const genres = [book.genre?.split(', ') ?? []].flat();

    this.bookForm.patchValue({
      title: book.title,
      author: book.author_name ?? [],
      publishYear: book.year,
      series: book.series,
      description: book.synopsis,
      genres: genres,
      tags: book.tags ?? [],
      isbn: book.isbn,
      publisher: book.publisher,
      language: displayLanguage,
      status: displayStatus,
      pageCount: book.pages,
      rating: book.rating,
      type: displayType,
    });
  }

  fetchBookDetails(bookId: string) {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.editMode = true;
      this.book = data;
      this.originalBook = { ...data }; // Create a copy of the original book data
      // now apply search match book fields to the book object
      this.updateBookFromSearch();
      this.updateBookForm(this.book);

    });
  }


  // Update the book object dynamically when a field changes
  onFieldChange<K extends keyof Book>(field: K, value: Book[K]): void {
    this.book[field] = value; // Dynamically update the field
  }

  createBook(): void {
    // POST request to create a new book
    // book/create_api, POST the data
    this.booksService.createBook(this.book)
      .subscribe({
        next: response => {
          console.log('Book created successfully:', response);
          //TODO save the book ID to the book object
          this.book.id = response.id; // Assuming the API returns the created book with its ID
        },
        error: error => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          // navigate back to where the user came from
          this.location.back();
        }
      });
  }

  saveBook(book: Book): void {
    // POST request to save the book
    // book/BOOK_ID/edit_api, POST the data
    this.booksService.saveBook(book)
      .subscribe({
        next: response => {
          console.log('Book saved successfully:', response);
        },
        error: error => {
          console.error('Error occurred:', error);
        },
        complete: () => {
          // navigate back to where the user came from
          this.location.back();
        }
      });
  }

  onSubmit(action: 'save' | 'saveAndClose'): void {
    if (this.bookForm.valid) {
      // Extract the form values
      const formData = this.bookForm.value;

      // Log the form data (for debugging purposes)
      console.log('Form Submitted:', formData);

      // convert the form data to the book object
      const dbStatus = this.reverseStatusMapping[formData.status];
      const dbType = this.reverseTypeMapping[formData.type];
      const dbLanguage = this.reverseLanguageMapping[formData.language];
      const dbGenres = formData.genres.map((genre: string) => genre.trim()).join(', '); // Join genres with commas
      const dbTags = formData.tags.map((tag: string) => tag.trim()).join(', '); // Join tags with commas
      // TODO cover picture
      const saveData ={
        ...formData,
        status: dbStatus,
        book_type: dbType,
        language: dbLanguage,
        genre: dbGenres,
        tags: dbTags,
        year: formData.publishYear,
        author_name: formData.author,
        synopsis: formData.description,
        pages: formData.pageCount,
      };
      
      // Call the backend API to save the data
      this.saveBook(saveData);
    } else {
      // Mark all controls as touched to display validation errors
      this.bookForm.markAllAsTouched();
      console.log('Form is invalid. Please fix the errors.');
    }
  }


  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.editableFields.forEach(field => field.isChecked = this.selectAllChecked);
  }

  updateSelectAllStatus(): void {
    this.selectAllChecked = this.editableFields.toArray().every(field => field.isChecked);
  }
}