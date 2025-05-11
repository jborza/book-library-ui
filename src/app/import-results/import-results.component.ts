import { Component } from '@angular/core';
import { ImportDataService } from '../import-data.service';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { ImportResultItemComponent } from '../import-result-item/import-result-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-results',
  imports: [ImportResultItemComponent, CommonModule],
  templateUrl: './import-results.component.html',
  styleUrl: './import-results.component.less'
})
export class ImportResultsComponent {
  importResults: any;
  existingBooks: Book[] = [];

  constructor(private importDataService: ImportDataService,
    private booksService: BooksService,
  ) { }

  ngOnInit() {
    this.importResults = this.importDataService.getImportResults();
    // remove comment after testing
    // this.importDataService.clearImportResults();
    
    // retrieve the existing book data from the API
    const existingBookIds = this.importResults
        .filter((book:any)=>book.existing_book)
        .map((book: any) =>  book.existing_book_id);
    this.booksService.getBooksByIds(existingBookIds).subscribe(
      {
        next: (response) => {
          console.log('Books data:', response);
          this.existingBooks = response.map((bookData: any) => new Book(bookData));
          // attach each existing book data to the corresponding import result
          for (let i = 0; i < this.importResults.length; i++) {
            const book = this.importResults[i];
            const existingBook = this.existingBooks.find((b: any) => b.id === book.existing_book_id);
            if (existingBook) {
              this.importResults[i].existing_book_data = { existingBook };
            }
          }
          console.log('Updated import results:', this.importResults);
        },
        error: (error) => {
          console.error('Error fetching books data:', error);
        }
      }
    );
  }

  onBack() {
    // Logic to navigate back to the previous page
  }

  handleAction(action: string, result: any): void {
  if (action === 'add') {
    console.log('Add new book:', result);
    // Implement logic to add the book
  } else if (action === 'merge') {
    console.log('Merge book:', result);
    // Implement logic to merge with an existing book
  }
}
}
