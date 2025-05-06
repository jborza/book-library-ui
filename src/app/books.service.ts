import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // TODO parametrize
  private apiUrl = 'http://localhost:5000/books/api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Method to fetch books by author
  getBooksByAuthor(authorName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?author=${encodeURIComponent(authorName)}`);
  }
}