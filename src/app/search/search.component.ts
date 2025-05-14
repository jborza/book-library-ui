import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../books.service';
import { CommonModule } from '@angular/common';
import { Book } from '../book.model';

@Component({
  selector: 'app-search',
  imports: [CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.less'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  series: string = '';
  books: Book[] = [];
  sortColumn: string = ''; // Column to sort by
  sortDirection: boolean = true; // true = ascending, false = descending


  constructor(private route: ActivatedRoute,
    private booksService: BooksService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('search_query') || '';
      if (this.searchQuery) {
        this.fetchSearchResults(this.searchQuery);
      }
      this.series = params.get('series') || '';
      if(this.series){
        this.fetchSeriesResults(this.series);
      }
    });
  }

  fetchSearchResults(query: string): void {
    this.booksService.searchBooks(query).subscribe((response) => {
      this.books = response.map((bookData: any) => new Book(bookData));
    });
  }

   fetchSeriesResults(query: string): void {
    this.booksService.searchBooksBySeries(query).subscribe((response) => {
      this.books = response.map((bookData: any) => new Book(bookData));
    });
  }

   sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; // Toggle sort direction
    } else {
      this.sortColumn = column;
      this.sortDirection = true; // Default to ascending
    }

    this.books.sort((a: any, b: any) => {
      const valueA = a[column] === null || a[column] === undefined ? '' : a[column];
      const valueB = b[column] === null || b[column] === undefined ? '' : b[column];

      const compared = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return compared * (this.sortDirection ? 1 : -1);     
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortDirection ? 'sort-icon asc' : 'sort-icon desc';
    }
    return '';
  }
}