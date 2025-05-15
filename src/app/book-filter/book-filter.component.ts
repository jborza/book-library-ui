import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-book-filter',
  imports: [CommonModule,
    FormsModule,
    NgxSliderModule
  ],
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.less'
})
export class BookFilterComponent {
  filters = {
    search: '',
    genre: '',
    language: '',
    minPages: null,
    maxPages: null,
    year: [2000, 2010],
    yearMin: 2000,
    yearMax: 2015,
    bookType: '',
  };

  yearOptions: Options = {
    floor: 1950,
    ceil: 2025
  };

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
