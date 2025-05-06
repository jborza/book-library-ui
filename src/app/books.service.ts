import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // TODO parametrize
  private apiUrl = 'http://localhost:5000/books/search_api';
  private addBookApiUrl = 'http://localhost:5000/books/add_book_api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to fetch books by author
  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search_query=${encodeURIComponent(query)}`);
  }

  toggleBookInCollection(book: any) : Observable<any> {
    return this.http.post(this.addBookApiUrl, book);
  }

}