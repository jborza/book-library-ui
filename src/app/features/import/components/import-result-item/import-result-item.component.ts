import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToNumberPipe } from '../../../../shared/pipes/to-number.pipe';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-import-result-item',
  imports: [CommonModule, ToNumberPipe, TruncatePipe],
  templateUrl: './import-result-item.component.html',
  styleUrl: './import-result-item.component.less',
})
export class ImportResultItemComponent {
  @Input() book: any; // Input to receive the result data
  @Output() actionChange = new EventEmitter<string>(); // Output to notify parent of action change

  selectedAction: string = 'merge'; // Default action

  getCoverImageUrl(book: Book): string {
    if (book?.cover_image) {
      if (book.cover_image.startsWith('http')) {
        return book.cover_image;
      } else {
        return 'http://localhost:5000/static/' + book.cover_image;
      }
    } else {
      return 'http://localhost:5000/static/placeholder_book.svg';
    }
  }

  // Emit the selected action whenever it changes
  onActionChange(action: string): void {
    this.selectedAction = action;
    this.actionChange.emit(action);
  }

  showBookType(): boolean {
    return (this.book?.book_type !== this.book?.existing_book_data?.existingBook?.book_type);
  }

  showIsbn(): boolean {
    return (this.book?.isbn !== this.book?.existing_book_data?.existingBook?.isbn);
  }

  showRating(): boolean {
    return (this.book?.rating !== this.book?.existing_book_data?.existingBook?.rating);
  }

  showPages(): boolean {
    return (this.book?.page_count !== this.book?.existing_book_data?.existingBook?.pages);
  }

  showYear(): boolean {
    return (this.book?.year_published !== this.book?.existing_book_data?.existingBook?.year);
  }

  showPublisher(): boolean {
    return (this.book?.publisher != this.book?.existing_book_data?.existingBook?.publisher);
  }

  showLanguage(): boolean {
    return (this.book?.language !== this.book?.existing_book_data?.existingBook?.language);
  }

  showTitle(): boolean {
    return (this.book?.title !== this.book?.existing_book_data?.existingBook?.title);
  }

  showGenre(): boolean {
    return (this.book?.genre !== this.book?.existing_book_data?.existingBook?.genre);
  }

  showSynopsis(): boolean {
    return (this.book?.synopsis !== this.book?.existing_book_data?.existingBook?.synopsis);
  }

  showSeries(): boolean {
    return (this.book?.series !== this.book?.existing_book_data?.existingBook?.series);
  }

  showAuthor(): boolean {
    return (this.book?.author_name !== this.book?.existing_book_data?.existingBook?.author_name);
  }

  showBadges(): boolean {
    return this.showBookType() || this.showIsbn() || this.showRating() || this.showPages() ||
      this.showYear() || this.showPublisher() || this.showLanguage() || this.showTitle() ||
      this.showGenre() || this.showSynopsis() || this.showSeries() || this.showAuthor();
  }

}
