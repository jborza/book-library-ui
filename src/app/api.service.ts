import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5000';

  private readonly endpoints = {
    search: `${this.baseUrl}/books/search_api`,
    addBook: `${this.baseUrl}/books/add_book_api`,
    get: `${this.baseUrl}/books/api`,
    book: `${this.baseUrl}/book/api`,
    saveBook: (bookId: string) => `${this.baseUrl}/book/${bookId}/edit_api`, // Dynamic URL
  };

  getSearchUrl(): string {
    return this.endpoints.search;
  }

  getAddBookUrl(): string {
    return this.endpoints.addBook;
  }

  getBookApiUrl(): string {
    return this.endpoints.book;
  }

  getSaveBookUrl(bookId: string): string {
    return this.endpoints.saveBook(bookId);
  }

  getGetUrl(): string{
    return this.endpoints.get;
  }

}
