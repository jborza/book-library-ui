import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  // TODO parametrize
  private apiUrl = 'http://localhost:5000/books/search_api';
  private addBookApiUrl = 'http://localhost:5000/books/add_book_api';
  private bookApiUrl = 'http://localhost:5000/book/api';
  // TODO fix this
  private saveBookApiUrl = 'http://localhost:5000/book/save_book_api';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getBooksFiltered(status?:string, type?:string): Observable<any> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (type) {
      params = params.set('type', type);
    }

    return this.http.get(this.bookApiUrl, { params });
  }

  getBookById(id: string): Observable<any> {
    // http://127.0.0.1:5000/book/api/2
    return this.http.get(`${this.bookApiUrl}/${id}`);
  }

  // Method to fetch books by author
  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search_query=${encodeURIComponent(query)}`);
  }

  toggleBookInCollection(book: any) : Observable<any> {
    // TODO implement?
    return this.http.post(this.addBookApiUrl, book);
  }

  saveBook(book: Book) {
    throw new Error('Method not implemented.');
  }

}