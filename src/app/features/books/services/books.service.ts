import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { ApiService } from '../../../core/services/api.service';
import { BookFilter } from '../book-filter';
@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient, private apiService: ApiService) { }

  getBooks(): Observable<any> {
    return this.http.get(this.apiService.getBookApiUrl());
  }

  getBooksByAuthor(author: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('author', author);

    return this.http.get(this.apiService.getGetUrl(), { params });
  }

  getBooksFiltered(
    search: BookFilter,
    sortColumn?: string,
    sortAscending?: boolean,
    currentPage?: number,
    pageSize?: number
  ): Observable<any> {
    let params = search.getSearchParams();
    if (pageSize) {
      params = params.set('page_size', pageSize.toString());
    }
    if (currentPage) {
      params = params.set('page', currentPage.toString());
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

  deleteBooks(bookIds: number[]): Observable<any> {
    const url = this.apiService.getDeleteBooksUrl();
    let body = {
      book_ids: bookIds,
    };
    return this.http.post(url, body);
  }

  updateBooks(bookIds: number[], data: any): Observable<any> {
    const url = this.apiService.getUpdateBooksUrl();
    let body = {
      book_ids: bookIds,
      data: data,
    };

    return this.http.post(url, body);
  }

  matchBooks(bookIds: number[], matchMetadata: boolean, matchCovers: boolean, provider: string): Observable<any> {
    const url = this.apiService.getMatchBooksUrl();
    let body = {
      book_ids: bookIds,
      match_metadata: matchMetadata,
      match_covers: matchCovers,
      provider: provider,
    };

    return this.http.post(url, body);
  }

  getDuplicateTitleBooks(): Observable<any> {
    const url = this.apiService.getDuplicateTitleBooksUrl();
    return this.http.get(url);
  }
}
