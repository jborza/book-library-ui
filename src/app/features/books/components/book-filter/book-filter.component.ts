import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { AuthorAutocompleteComponent } from '../../../authors/components/author-autocomplete/author-autocomplete.component';
import { BookFilter } from '../../book-filter';
import { loadFromUrlParams } from '../../../../shared/utils/url-parameters';
import { ActivatedRoute } from '@angular/router';
import { IconPickerComponent } from '../../../../shared/components/icon-picker/icon-picker.component';
import { BookSearchService } from '../../services/book-search.service';

declare var bootstrap: any;
@Component({
  selector: 'app-book-filter',
  imports: [
    CommonModule,
    FormsModule,
    NgxSliderModule,
    AuthorAutocompleteComponent,
    IconPickerComponent
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

  @Output() resetPage = new EventEmitter<any>();
  @Output() saveRequested = new EventEmitter<any[]>();

  @Input() genres: string[] = [];
  @Input() series: string[] = [];
  @Input() languages: string[] = [];
  ratingEnabled: boolean = false;
  yearEnabled: boolean = false;
  pagesEnabled: boolean = false;
  saveName: string = '';
  selectedIcon: string = '';
  @ViewChild('filterPanelRef') filterPanelRef!: ElementRef<HTMLDivElement>;
  isCollapsed = true; // collapsed by default

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

  get summaryText() {
    return this.filters.summarize();
  }

  constructor(private route: ActivatedRoute,
    private bookSearchService: BookSearchService
  ) {
    bookSearchService.searchValue$.subscribe((value) => {
      this.filters.search = value; // Update searchText when the service emits a new value
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.filters = new BookFilter();
      loadFromUrlParams(this.filters, params);
      this.filtersChanged.emit(this.filters);
    });
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

  ngAfterViewInit() {
    // Listen for Bootstrap collapse events
    const el = this.filterPanelRef.nativeElement;
    el.addEventListener('shown.bs.collapse', () => this.isCollapsed = false);
    el.addEventListener('hidden.bs.collapse', () => this.isCollapsed = true);
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
    this.resetPage.emit();
    this.filtersChanged.emit(this.filters);
    console.log('Filters changed: status:', this.filters.status);
  }

  saveSearch() {
    this.saveRequested.emit([this.filters, this.saveName, this.selectedIcon]);
    const modalElement = document.getElementById('savePromptModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }

  iconSelected($event: any) {
    this.selectedIcon = $event;
  }

  // Method to update the search value in the service
  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast the target to HTMLInputElement
    this.bookSearchService.setSearchValue(inputElement.value);
  }
}
