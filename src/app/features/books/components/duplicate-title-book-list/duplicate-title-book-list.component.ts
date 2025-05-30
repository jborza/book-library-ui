import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-duplicate-title-book-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './duplicate-title-book-list.component.html',
  styleUrl: './duplicate-title-book-list.component.less'
})
export class DuplicateTitleBookListComponent {

  books: Book[] = [];
  
  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.fetchDuplicateTitleBooks();
  }

  fetchDuplicateTitleBooks() {
    this.booksService.getDuplicateTitleBooks().subscribe({
      next: (books: Book[]) => {
         if (Array.isArray(books)) {
          this.books = books.map((bookData) => new Book(bookData));
         }
        },
      error: (error) => {
        console.error('Error fetching duplicate title books:', error);
        // Handle the error appropriately, e.g., show a notification or alert
      },
    });
  }

}
