import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../../search/services/search.service';
import { MatchResultItemComponent } from '../match-result-item/match-result-item.component';
import { BookDataService } from '../../services/book-data.service';
import { levenshteinDistance } from '../../../../shared/utils/string-utils';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatchProvidersService } from '../../services/match-providers.service';

@Component({
  selector: 'app-book-match-results',
  imports: [CommonModule,
    MatchResultItemComponent,
    ReactiveFormsModule],
  templateUrl: './book-match-results.component.html',
  styleUrl: './book-match-results.component.less'
})
export class BookMatchResultsComponent {
  bookId!: number;
  searchResults: any[] = [];
  searchForm: FormGroup;
  providers: string[] = MatchProvidersService.PROVIDERS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private bookDataService: BookDataService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      provider: [this.providers[0]], // Default to the first provider
      searchTitle: '', // Default to the first search title
    });
  }

  ngOnInit(): void {
    // Get the search query from the route parameters
    this.route.params.subscribe(params => {
      this.bookId = +params['id']; // '+' converts it to a number
    });
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['query'] || '';
      // set the search title in the form
      this.searchForm.get('searchTitle')?.setValue(searchQuery);
      this.performSearch();
    });

  }

  onSearch(): void {
    console.log('Search Form Values:', this.searchForm.value);
    this.performSearch();
  }

  sortByLevenshteinDistance(array: any[], title: string, author: string): any[] {
    return array.sort((a, b) => {
      const distanceA =
        levenshteinDistance(a.title || '', title) + levenshteinDistance(a.author_name || '', author);
      const distanceB =
        levenshteinDistance(b.title || '', title) + levenshteinDistance(b.author_name || '', author);

      return distanceA - distanceB;
    });
  }

  searchTitle(): string {
    return this.searchForm.get('searchTitle')?.value;
  }

  searchProvider(): string {
    const provider = this.searchForm.get('provider')?.value;
    if (provider === 'Google Books') {
      return SearchService.GOOGLEBOOKS;
    } else if (provider === 'Open Library') {
      return SearchService.OPENLIBRARY;
    }
    else if (provider === 'Amazon') {
      return SearchService.AMAZON;
    }
    else {
      throw new Error('Invalid search provider');
    }
  }

  private sortSearchedResults(searchQuery: string, response: any): any[] {
    if (searchQuery.includes(' - ')) {
      return this.sortByLevenshteinDistance(
        response,
        searchQuery.split(' - ')[1] || '',
        searchQuery.split(' - ')[0] || ''
      );
    }
    else {
      return this.sortByLevenshteinDistance(
        response,
        searchQuery,
        ''
      );
    }
  }

  performSearch(): void {
    this.searchService.searchBooks(this.searchProvider(), this.searchTitle()).subscribe(
      {
        next: (response: any) => {
          if (!response || response.length === 0) {
            console.warn('No search results found for:', this.searchTitle());
            this.searchResults = [];
            return;
          }
          console.log('Search results:', response);
          // sort the results by relevance
          const searchQuery = this.searchTitle();
          // if there is an author in the search query, split it
          const sortedBooks = this.sortSearchedResults(searchQuery, response);                  
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
