import { Component } from '@angular/core';
import { ImportDataService } from '../import-data.service';
import { BooksService } from '../books.service';
import { Book } from '../book.model';
import { ImportResultItemComponent } from '../import-result-item/import-result-item.component';
import { CommonModule } from '@angular/common';
import { ImportService } from '../import.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-results',
  imports: [ImportResultItemComponent, CommonModule],
  templateUrl: './import-results.component.html',
  styleUrl: './import-results.component.less'
})
export class ImportResultsComponent {
  importResults: any;
  existingBooks: Book[] = [];
  // selected action for existing books
  actions: { [key: string]: string } = {};

  constructor(private importDataService: ImportDataService,
    private booksService: BooksService,
    private importService: ImportService,
    private router: Router
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
              //prepopulate the action for each book
              this.actions[existingBook.id] = 'merge';
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

confirmImport() {
    // for each book, it can be either add or merge
    console.log('Importing books:', this.importResults);
    // send the import results to the API
    console.log('Actions:', this.actions);
    // add the action to each book as action - add/merge
    for(let book of this.importResults) {
      if(book.existing_book) {
        book.action = this.actions[book.existing_book_data.existingBook.id];
      }
    }
    // import API - /import/confirm_import_api
    this.importService.confirmImport(this.importResults).subscribe(
      {
        next: (response) => {
          console.log('Import confirmed:', response);
          // Clear the import results after confirmation
          this.importDataService.clearImportResults();
          // navigate to books page
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error confirming import:', error);
        }
      }
    );
  }

  // Update the action for a specific result
  onActionChange(action: string, result: any): void {
    this.actions[result.existing_book_data.existingBook.id] = action; // Use a unique property like `title` as the key
  }
}
