import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchService } from '../search.service';

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
      private searchService: SearchService) {}

      ngOnInit(): void {
        this.route.queryParamMap.subscribe((params) => {
          this.searchQuery = params.get('search_query') || '';
          this.where = params.get('where') || 'openlibrary';
          if (this.searchQuery) {
            this.fetchSearchResults(this.where, this.searchQuery);
          }
        });
      }

      fetchSearchResults(where: string, query: string): void {
        this.searchService.searchBooks(where, query, this.count).subscribe((response) => {
          this.books = response;
        });
      }
}
