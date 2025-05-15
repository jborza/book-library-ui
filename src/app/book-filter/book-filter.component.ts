import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { AuthorAutocompleteComponent } from '../author-autocomplete/author-autocomplete.component';

@Component({
  selector: 'app-book-filter',
  imports: [CommonModule,
    FormsModule,
    NgxSliderModule,
    AuthorAutocompleteComponent
  ],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.less'
})
export class BookFilterComponent {
  filters = {
    search: '',
    genre: '',
    language: '',
    yearMin: 1900,
    yearMax: 2025,
    pagesMin: 0,
    pagesMax: 1000,
    ratingMin: 0.1,
    ratingMax: 5,
    bookType: '',
    author: '',
  };

  ratingOptions: Options = {
    floor: 0,
    ceil: 5,
    step: 0.1,
  }

  // TODO read from the API
  yearOptions: Options = {
    floor: 1900,
    ceil: 2025 //TODO change to this year
  };

  // TODO read from the API
  pagesOptions: Options = {
    floor: 0,
    ceil: 1000,
  };

  @Input() authors: string[] = [];
  @Input() minmax: any;

  // Emit the filter changes to the parent component
  @Output() filtersChanged = new EventEmitter<any>();

  // Example: Genres and languages (replace with data from your backend)
  // TODO move these to a service
  // TODO fetch these from the backend
  genres = ['Fiction', 'Non-fiction', 'Fantasy', 'Science Fiction', 'Biography'];
  languages = ['English', 'German', 'Slovak', 'Czech']; // TODO add country icons
  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];
  // TODO fetch from the DB
  years = Array.from({ length: new Date().getFullYear() - 1900 }, (_, i) => 1900 + i); // Years from 1900 to 2023

  ngOnInit() {
    console.log('BookFilterComponent authors:', this.authors);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minmax'] && this.minmax) {
      this.pagesOptions = {
        floor: this.minmax.page_count?.min || 0,
        ceil: this.minmax.page_count?.max || 1000,
      };
      this.ratingOptions = {
        floor: this.minmax.rating?.min || 0.1,
        ceil: this.minmax.rating?.max || 5,
        step: 0.1,
      };
      this.yearOptions = {
        floor: this.minmax.year?.min || 1900,
        ceil: this.minmax.year?.max || new Date().getFullYear(),
      };
    }
  }

  // Emit the updated filters whenever a filter is changed
  onFilterChange() {
    //this.filtersChanged.emit(this.filters);
  }

  filter() {
    // Emit the updated filters whenever a filter is changed
    this.filtersChanged.emit(this.filters);
  }
}
