import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookDataService } from '../book-data.service';
import { Book } from '../book.model';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../books.service';
import { EditableFieldComponent } from '../editable-field/editable-field.component';

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

  constructor(private route: ActivatedRoute,
    private bookDataService: BookDataService,
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    // load book data from the service
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
    // if we come in from book match results, pre-fill the form with the selected book
    this.bookDataService.selectedBook$.subscribe(searchBook => {
      console.log('Selected Book from service:', searchBook);
      if (searchBook) {
        // Use the selected book data to populate your form
        this.searchBook = searchBook;
        //this.bookForm.patchValue(book);
        console.log('Search Book:', searchBook);
      }
    });
  }

  fetchBookDetails(bookId: string) {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.book = data;
      this.originalBook = { ...data }; // Create a copy of the original book data
    });
  }


  // Update the book object dynamically when a field changes
  onFieldChange<K extends keyof Book>(field: K, value: Book[K]): void {
    console.log(`Field changed: ${field}, New value: ${value}`);
    this.book[field] = value; // Dynamically update the field
  }

  //TODO handle select all click/unclick

  saveBook(): void {
    console.log('Saving book:', this.book);
    console.log('Book data before save:', JSON.stringify(this.book, null, 2));
    // POST request to save the book
    //this.booksService.saveBook(this.book).subscribe( ) .... ?
    // book/BOOK_ID/edit_api, POST the data
    // TODO replace with observer!!!
    // TODO seems like we're saving the OLD book, not the new one - WTF
    this.booksService.saveBook(this.book).subscribe((response) => {
      console.log('Book saved successfully:', response);
      alert('Book saved successfully!');
      // Optionally, navigate back to the book details page or show a success message
    }, (error) => {
      console.error('Error saving book:', error);
    });
  }
}