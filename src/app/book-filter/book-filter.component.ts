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
    series: ''
  };

  ratingOptions: Options = {
    floor: 0,
    ceil: 5,
    step: 0.1,
  }

  yearOptions: Options = {
    floor: 1900,
    ceil: 2025
  };

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
  @Input() genres: string[] = [];
  @Input() series: string[] = [];
  @Input() languages: string[] = [];

  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];

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
    if(changes['genres']) {
      this.genres = changes['genres'].currentValue;
    }
    if(changes['series']) {
      this.series = changes['series'].currentValue;
    }
  }

  // Emit the updated filters whenever a filter is changed
  onFilterChange() {
    //this.filtersChanged.emit(this.filters);
    // TODO emit, so the list can reload the books
  }

  filter() {
    // Emit the updated filters whenever a filter is changed
    this.filtersChanged.emit(this.filters);
  }
}
