import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { ToNumberPipe } from '../../../../shared/pipes/to-number.pipe';
import { CustomSearch } from '../../../search/models/custom-search.model'
import { SettingsService } from '../../../../core/services/settings.service';
import { Collection } from '../../../collections/models/collection.model';
import { CollectionsService } from '../../../../core/services/collections.service';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, ToNumberPipe, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.less',
})
export class BookDetailsComponent implements OnInit {
  bookId: string | null = null;
  genres: string[] = [];
  tags: string[] = [];
  book!: Book;
  authorOtherBooks: Book[] = [];
  recommendations: any; // TODO type
  customSearches: CustomSearch[] = [];
  collections: Collection[] = [];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private router: Router,
    private location: Location,
    private settingsService: SettingsService,
    private collectionsService: CollectionsService
  ) {
    this.customSearches = this.settingsService.getCustomSearches();
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    // Fetch book details using the bookId
    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
      this.fetchRecommendations(this.bookId);
      this.fetchCollections(this.bookId);
    }
  }

  fetchBookDetails(bookId: string): void {
    this.booksService.getBookById(bookId).subscribe((data) => {
      this.book = data;
      // ugly hack - page_count
      this.book.pages = this.book.pages ? this.book.pages : data.page_count;
      this.book.year = data.year_published;
      // split genres and tags
      this.genres = data.genre ? data.genre.split(',') : [];
      this.tags = data.tags ? data.tags.split(',') : [];
      // fetch other books by the same author
      this.booksService
        .getBooksByAuthor(this.book.author_name)
        .subscribe((data) => {
          this.authorOtherBooks = data.books;
        });
    });
  }

  fetchRecommendations(bookId: string): void {
    this.booksService.getRecommendations(bookId).subscribe({
      next: (response) => {
        this.recommendations = response;
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {},
    });
  }

  fetchCollections(bookId: string): void {
    this.collectionsService.getCollectionsForBook(bookId).subscribe({
      next: (response) => {
        this.collections = response;
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
    });
  }

  getCoverImageUrl(book: Book, tiny: boolean = false): string {
    if (tiny) {
      if (book?.cover_image_tiny) {
        return 'http://localhost:5000/static/' + book.cover_image_tiny;
      } else {
        return 'http://localhost:5000/static/placeholder_book.svg';
      }
    } else {
      if (book?.cover_image) {
        return 'http://localhost:5000/static/' + book.cover_image;
      } else {
        return 'http://localhost:5000/static/placeholder_book.svg';
      }
    }
  }

  match(): void {
    // retrieve search results from the service
    const searchQuery = this.book.author_name + ' - ' + this.book.title;
    // book/:id/match
    this.router.navigate(['/book', this.book.id, 'match'], {
      queryParams: { query: searchQuery },
    });
  }

  edit(): void {
    // book/:id/edit
    this.router.navigate(['/books', this.book.id, 'edit'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  updateBookStatus(status: string): void {
    // use book service to update the book status
    this.book.status = status;
    this.booksService.saveBook(this.book).subscribe((data) => {
      console.log('Book status updated:', data);
    });
  }

  wantToRead(): void {
    this.updateBookStatus(Book.TO_READ);
  }

  currentlyReading(): void {
    this.updateBookStatus(Book.CURRENTLY_READING);
  }

  read(): void {
    this.updateBookStatus(Book.READ);
  }

  buy(where: string): void {
    // where can be 'amazon', 'martinus', 'knihobot'
    //
    // book/:id/buy
    // ideally in a second tab
    // this.router.navigate(['/books', this.book.id, 'buy'], { queryParams: { where: where } });
    let url = '';
    if (where === 'amazon') {
      url =
        'https://www.amazon.com/s?k=' +
        this.book.title +
        ' ' +
        this.book.author_name;
    } else if (where === 'martinus') {
      url =
        'https://www.martinus.sk/search?q=' +
        this.book.title +
        ' ' +
        this.book.author_name;
    } else if (where === 'knihobot') {
      url =
        'https://www.knihobot.sk/p/q/' +
        this.book.title +
        ' ' +
        this.book.author_name;
    } else {
      console.error('Unknown book source:', where);
      return;
    }

    window.open(url, '_blank');
  }

  googleBook(): void {
    // https://www.google.com/search?client=firefox-b-d&q=Sophia+Amoruso+girlboss
    const query = this.book.title + ' ' + this.book.author_name;
    // replace hashes with spaces
    const queryFixed = query.replace(/#/g, ' ');
    const search = encodeURI(queryFixed);
    const url = 'https://www.google.com/search?q=' + search;
    console.log('Google Book URL:', url);
    window.open(url, '_blank');
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      // book/:id/delete
      this.booksService.deleteBook(this.book.id).subscribe((data) => {
        console.log('Book deleted:', data);
        // navigate back to wherever the user came from
        this.location.back();
      });
    }
  }

  // Format the URL with the search query
  // TODO this should probably live with the CustomSearch model
  formatSearchUrl(url: string): string {
    const searchQuery = `${this.book.title} ${this.book.author_name}`.trim();
    return url.replace('{search}', encodeURIComponent(searchQuery));
  }
}
