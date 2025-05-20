import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { ApiService } from './api.service';
import { BookFilter } from './book-filter';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiService.getBookApiUrl());
  }

  // TODO definitely move this to an authors service
  // TODO add filters
  getAuthorsFiltered(search?: BookFilter): Observable<any> {
    return this.http.get(this.apiService.getAuthorSearchsUrl());
  }

  getBooksByAuthor(author: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('author', author);

    return this.http.get(this.apiService.getGetUrl(), { params });
  }

  getBooksFiltered(
    status?: string,
    type?: string,
    search?: BookFilter,
    sortColumn?: string,
    sortAscending?: boolean,
    currentPage?: number,
    pageSize?: number
  ): Observable<any> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (type) {
      params = params.set('type', type);
    }
    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('page', currentPage.toString());
    }
    if (search?.search) {
      params = params.set('search', search.search);
    }
    if (search?.genre) {
      params = params.set('genre', search.genre);
    }
    if (search?.language) {
      params = params.set('language', search.language);
    }
    if (search?.yearEnabled) {
      if (search?.yearMin) {
        params = params.set('year_min', search.yearMin.toString());
      }
      if (search?.yearMax) {
        params = params.set('year_max', search.yearMax.toString());
      }
    }
    if (search?.pagesEnabled) {
      if (search?.pagesMin) {
        params = params.set('pages_min', search.pagesMin.toString());
      }
      if (search?.pagesMax) {
        params = params.set('pages_max', search.pagesMax.toString());
      }
    }
    if (search?.ratingEnabled) {
      if (search?.ratingMin) {
        params = params.set('rating_min', search.ratingMin.toString());
      }
      if (search?.ratingMax) {
        params = params.set('rating_max', search.ratingMax.toString());
      }
    }
    if (search?.author) {
      params = params.set('author', search.author);
    }
    if (search?.series) {
      params = params.set('series', search.series);
    }
    if (sortColumn) {
      params = params.set('sort_column', sortColumn);
    }
    if (sortAscending) {
      params = params.set('sort_ascending', sortAscending);
    }
    return this.http.get(this.apiService.getGetUrl(), { params });
  }

  getBookById(id: string): Observable<any> {
    // http://127.0.0.1:5000/book/api/2
    return this.http.get(`${this.apiService.getBookApiUrl()}/${id}`);
  }

  getBooksByIds(ids: string[]): Observable<any> {
    return this.http.get(this.apiService.getBooksByIdsUrl(ids));
  }

  getRecommendations(id: string): Observable<any> {
    return this.http.get(this.apiService.getRecommendationsUrl(id));
  }

  // Method to fetch books
  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiService.getSearchUrl()}?search_query=${encodeURIComponent(
        query
      )}`
    );
  }

  searchBooksBySeries(series: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiService.getSearchUrl()}?series=${encodeURIComponent(series)}`
    );
  }

  toggleBookInCollection(book: Book): Observable<any> {
    // it's not really a toggle - we can't remove a book from the collection yet
    return this.http.post(this.apiService.getCreateBookUrl(), book);
  }

  createBook(book: Book): Observable<any> {
    const url = this.apiService.getCreateBookUrl();
    return this.http.post(url, book);
  }

  saveBook(book: Book): Observable<any> {
    const url = this.apiService.getSaveBookUrl(book.id.toString());
    return this.http.post(url, book);
  }

  deleteBook(id: number): Observable<any> {
    const url = this.apiService.getBookByIdUrl(id.toString());
    return this.http.delete(url);
  }

  updateBooks(bookIds: number[], data: any): Observable<any> {
    const url = this.apiService.getUpdateBooksUrl();
    let body = {
      book_ids: bookIds,
      data: data, //TODO see how it looks like in the backend
    };

    return this.http.post(url, body);
  }
}
