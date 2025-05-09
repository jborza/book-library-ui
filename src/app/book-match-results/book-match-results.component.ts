import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';
import { MatchResultItemComponent } from '../match-result-item/match-result-item.component';
import { BookDataService } from '../book-data.service';
import { levenshteinDistance } from '../string-utils';

@Component({
  selector: 'app-book-match-results',
  imports: [CommonModule, MatchResultItemComponent],
  templateUrl: './book-match-results.component.html',
  styleUrl: './book-match-results.component.less'
})
export class BookMatchResultsComponent {
  searchQuery: string = '';
  bookId!: number;
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private bookDataService: BookDataService
  ) {}

  ngOnInit(): void {
    // Get the search query from the route parameters
    this.route.params.subscribe(params => {
      this.bookId = +params['id']; // '+' converts it to a number
      console.log('Book ID:', this.bookId);
    });
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.performSearch();
    });
  }

  sortByLevenshteinDistance(array: any[], title: string, author: string): any[] {
    return array.sort((a, b) => {
      const distanceA =
        levenshteinDistance(a.title || '', title) + levenshteinDistance(a.author || '', author);
      const distanceB =
        levenshteinDistance(b.title || '', title) + levenshteinDistance(b.author || '', author);
  
      return distanceA - distanceB;
    });
  }

  performSearch(): void {
    // Replace with your API call
    this.searchService.searchBooks(SearchService.GOOGLEBOOKS, this.searchQuery).subscribe(
      {
        next: (response: any) => {
          console.log('Search results:', response);
          // sort the results by relevance
          const sortedBooks = this.sortByLevenshteinDistance(
            response,
            this.searchQuery.split(' - ')[1] || '',
            this.searchQuery.split(' - ')[0] || ''
          );
          this.searchResults = sortedBooks || [];
        },
        error: (err: any) => {
          console.error('Error fetching search results:', err);
        },
        complete: () => { }
      });
  }

  selectSearchResult(selectedItem: any): void {
    console.log('Selected Item:', selectedItem);
    this.bookDataService.setSelectedBook(selectedItem);
    // book/:id/edit_match
    this.router.navigate(['/books', this.bookId, 'edit'],);
  }
}
