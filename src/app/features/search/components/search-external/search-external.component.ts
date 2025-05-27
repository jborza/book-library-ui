import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service'
import { BooksService } from '../../../books/services/books.service';

@Component({
  selector: 'app-search-external',
  imports: [CommonModule],
  templateUrl: './search-external.component.html',
  styleUrl: './search-external.component.less'
})
export class SearchExternalComponent {
  // parametrized - where - google or openlibrary
  // search - search term

  searchQuery: string = '';
  books: any[] = [];
  where: string = '';
  count: number = 10;
  
    constructor(private route: ActivatedRoute,
      private searchService: SearchService,
      private booksService: BooksService) {}

      ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
          this.searchQuery = params.get('search_query') || '';
          this.where = params.get('where') || 'openlibrary';
          this.count = parseInt(params.get('count') || '10', 10);
          if (this.searchQuery) {
            this.fetchSearchResults();
          }
        });
      }

      fetchSearchResults(): void {
        this.searchService.searchBooks(this.where, this.searchQuery, this.count)
        .subscribe((response) => {
          this.books = response;
        });
      }

      addToCollection(book: any): void {
        // Toggle the inCollection state
        book.inCollection = !book.inCollection;
    
        // Call the API with the book data
        this.booksService.toggleBookInCollection(book).subscribe(() => {
          console.log(
            `${book.inCollection ? 'Added to' : 'Removed from'} collection: ${book.title}`
          );
        });
      }
}
