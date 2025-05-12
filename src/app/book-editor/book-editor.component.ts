import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookDataService } from '../book-data.service';
import { Book } from '../book.model';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../books.service';
import { EditableFieldComponent } from '../editable-field/editable-field.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-editor',
  imports: [CommonModule, FormsModule, EditableFieldComponent],
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

  @ViewChildren(EditableFieldComponent) editableFields!: QueryList<EditableFieldComponent>;

  constructor(private route: ActivatedRoute,
    private bookDataService: BookDataService,
    private booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    // load book data from the service
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
    else{
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
        console.log('setting title to:', searchBook.title+" on "+this.book);
        this.updateBookFromSearch();
        this.bookDataService.clearSelectedBook();
      }
    });
  }

  private updateBookFromSearch() {
    if(this.searchBook === undefined) {
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
    if(searchBook.cover_image)
      this.book.cover_image = searchBook.cover_image;
    console.log('Setting genre:', this.book.genre);
  }

  fetchBookDetails(bookId: string) {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.editMode = true;
      this.book = data;
      this.originalBook = { ...data }; // Create a copy of the original book data
      // now apply search match book fields to the book object
      this.updateBookFromSearch();
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
          // navigate back to the book details page
          this.router.navigate(['/books', this.book.id]);
      }
    });
  }

  saveBook(): void {
    // POST request to save the book
    // book/BOOK_ID/edit_api, POST the data
    this.booksService.saveBook(this.book)
    .subscribe({
      next: response => {
        console.log('Book saved successfully:', response);
      },
      error: error => {
        console.error('Error occurred:', error);
      },
      complete: () => {
          // navigate back to the book details page
          this.router.navigate(['/books', this.book.id]);
      }
    });
  }

  toggleSelectAll(): void {
    this.selectAllChecked = !this.selectAllChecked;
    this.editableFields.forEach(field => field.isChecked = this.selectAllChecked);
  }

  updateSelectAllStatus(): void {
    this.selectAllChecked = this.editableFields.toArray().every(field => field.isChecked);
  }
}