import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { AuthorAutocompleteComponent } from '../author-autocomplete/author-autocomplete.component';
import { BookFilter } from '../book-filter';

declare var bootstrap: any;
@Component({
  selector: 'app-book-filter',
  imports: [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    AuthorAutocompleteComponent,
  ],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.less',
})
export class BookFilterComponent {
  filters: BookFilter = new BookFilter();

  @Input() authors: string[] = [];
  @Input() minmax: any;

  // Emit the filter changes to the parent component
  @Output() filtersChanged = new EventEmitter<any>();

  @Output() saveRequested = new EventEmitter<any[]>();


  // Example: Genres and languages (replace with data from your backend)
  // TODO move these to a service
  // TODO fetch these from the backend
  @Input() genres: string[] = [];
  @Input() series: string[] = [];
  @Input() languages: string[] = [];
  ratingEnabled: boolean = false;
  yearEnabled: boolean = false;
  pagesEnabled: boolean = false;
  saveName: string = '';

  statuses = ['Read', 'Reading', 'To Read', 'Abandoned', 'Wish List'];
  bookTypes = ['Ebook', 'Audiobook', 'Physical Book'];

  get ratingOptions() {
    return {
      floor: this.minmax?.rating?.min || 0.1,
      ceil: this.minmax?.rating?.max || 5,
      step: 0.1,
      disabled: !this.ratingEnabled,
    };
  }

  get yearOptions() {
    return {
      floor: this.minmax?.year?.min || 1900,
      ceil: this.minmax?.year?.max || new Date().getFullYear(),
      disabled: !this.yearEnabled,
    };
  }

  get pagesOptions() {
    return {
      floor: this.minmax?.page_count?.min || 0,
      ceil: this.minmax?.page_count?.max || 1000,
      disabled: !this.pagesEnabled,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minmax'] && this.minmax) {
    }
    if (changes['genres']) {
      this.genres = changes['genres'].currentValue;
    }
    if (changes['series']) {
      this.series = changes['series'].currentValue;
    }
  }

  onFilterChange() {
    // intentionally left empty, we only filter on the button click
  }

  filter() {
    // Emit the updated filters whenever a filter is changed
    // disable rating, year, and pages if the checkbox is not set
    this.filters.ratingEnabled = this.ratingEnabled;
    this.filters.yearEnabled = this.yearEnabled;
    this.filters.pagesEnabled = this.pagesEnabled;
    this.filtersChanged.emit(this.filters);
  }

  saveSearch() {
    this.saveRequested.emit([this.filters, this.saveName]);
    // TODO close the popup
    const modalElement = document.getElementById('savePromptModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

}
