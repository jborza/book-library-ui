import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient,
    private apiService: ApiService
  ) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiService.getBookApiUrl());
  }

  getBooksFiltered(status?:string, type?:string): Observable<any> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (type) {
      params = params.set('type', type);
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

  // Method to fetch books
  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiService.getSearchUrl()}?search_query=${encodeURIComponent(query)}`);
  }

  searchBooksBySeries(series: string): Observable<any> {
    return this.http.get<any>(`${this.apiService.getSearchUrl()}?series=${encodeURIComponent(series)}`);
  }

  toggleBookInCollection(book: Book) : Observable<any> {
    // it's not really a toggle - we can't remove a book from the collection yet
    return this.http.post(this.apiService.getCreateBookUrl(), book);
  }

  createBook(book: Book) : Observable<any> {
    const url = this.apiService.getCreateBookUrl();
    return this.http.post(url, book);
  }

  saveBook(book: Book) : Observable<any> {
    const url = this.apiService.getSaveBookUrl(book.id.toString());
    return this.http.post(url, book);
  }

  deleteBook(id: number) : Observable<any> {
    const url = this.apiService.getBookByIdUrl(id.toString());
    return this.http.delete(url);
  }

}