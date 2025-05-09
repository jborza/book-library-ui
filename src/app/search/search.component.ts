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
  books: Book[] = [];

  constructor(private route: ActivatedRoute,
    private booksService: BooksService) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('search_query') || '';
      if (this.searchQuery) {
        this.fetchSearchResults(this.searchQuery);
      }
    });
  }

  fetchSearchResults(query: string): void {
    this.booksService.searchBooks(query).subscribe((response) => {
      this.books = response.map((bookData: any) => new Book(bookData));
    });
  }
}