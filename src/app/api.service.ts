import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:5000';

  private readonly endpoints = {
    search: `${this.baseUrl}/books/search_api`,
    addBook: `${this.baseUrl}/book/add_book_api`,
    get: `${this.baseUrl}/books/api`,
    book: `${this.baseUrl}/book/api`,
    saveBook: (bookId: string) => `${this.baseUrl}/book/${bookId}/edit_api`, // Dynamic URL
    importCsv: `${this.baseUrl}/import/import_csv_api`,
    confirmImport: `${this.baseUrl}/import/confirm_import_api`,
    getBooksByIds: (ids: string[]) => `${this.baseUrl}/books/api/byid?ids=${ids.join(',')}`,
  };

  getSearchUrl(): string {
    return this.endpoints.search;
  }

  getCreateBookUrl(): string {
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

  getImportCsvUrl() : string {
    return this.endpoints.importCsv;
  }

  getBooksByIdsUrl(ids: string[]): string {
    return this.endpoints.getBooksByIds(ids);
  }

  getConfirmImportUrl() : string {
    return this.endpoints.confirmImport;
  }
}
