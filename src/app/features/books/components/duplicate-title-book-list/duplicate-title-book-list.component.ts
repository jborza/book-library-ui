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
  selectedBooks = new Set<number>();

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

  toggleSelection(bookId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedBooks.add(bookId);
    } else {
      this.selectedBooks.delete(bookId);
    }
  }

  deleteSelected(): void {
    if (this.selectedBooks.size === 0) {
      return;
    }
    // TODO use the same service method as in the books list
    this.booksService.deleteBooks(Array.from(this.selectedBooks)).subscribe({
      next: () => {
        this.selectedBooks.clear(); 
        this.fetchDuplicateTitleBooks();
      },
      error: (error) => {
        console.error('Error deleting selected books:', error);
      },
    });
  }
}
