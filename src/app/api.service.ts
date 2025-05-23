import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5000';
  // private baseUrl = 'http://192.168.100.9:5000';

  private readonly endpoints = {
    search: `${this.baseUrl}/books/search_api`,
    addBook: `${this.baseUrl}/book/add_book_api`,
    get: `${this.baseUrl}/books/api`,
    book: `${this.baseUrl}/book/api`,
    saveBook: (bookId: string) => `${this.baseUrl}/book/${bookId}/edit_api`, // Dynamic URL
    importCsv: `${this.baseUrl}/import/import_csv_api`,
    importCsvAll: `${this.baseUrl}/import/import_csv_all_api`,
    importNotes: `${this.baseUrl}/import/import_notes_api`,
    confirmImport: `${this.baseUrl}/import/confirm_import_api`,
    getBooksByIds: (ids: string[]) =>
      `${this.baseUrl}/books/api/byid?ids=${ids.join(',')}`,
    bookById: (bookId: string) => `${this.baseUrl}/book/${bookId}`,
    genres: `${this.baseUrl}/genres/api`,
    series: `${this.baseUrl}/series/api`,
    authors: `${this.baseUrl}/authors/api`,
    authorsSearch: `${this.baseUrl}/books/api/authors`,
    imageUrl: `${this.baseUrl}/static/`,
    updateBooks: `${this.baseUrl}/books/update_books_api`,
    recommendations: (bookId: string) =>
      `${this.baseUrl}/recommendations/${bookId}`,
    thumbnailUpload: `${this.baseUrl}/thumbnails/upload`,
    ping: `${this.baseUrl}/ping`,
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

  getGetUrl(): string {
    return this.endpoints.get;
  }

  getImportCsvUrl(): string {
    return this.endpoints.importCsv;
  }

  getImportCsvAllUrl(): string {
    return this.endpoints.importCsvAll;
  }

  getImportNotesUrl(): string {
    return this.endpoints.importNotes;
  }

  getBooksByIdsUrl(ids: string[]): string {
    return this.endpoints.getBooksByIds(ids);
  }

  getConfirmImportUrl(): string {
    return this.endpoints.confirmImport;
  }

  getBookByIdUrl(bookId: string): string {
    return this.endpoints.bookById(bookId);
  }

  getGenresUrl(): string {
    return this.endpoints.genres;
  }

  getSeriesUrl(): string {
    return this.endpoints.series;
  }

  getAuthorsUrl(): string {
    return this.endpoints.authors;
  }

  getAuthorSearchsUrl(): string {
    return this.endpoints.authorsSearch;
  }

  getImageUrl(coverImage: any): string {
    return `${this.endpoints.imageUrl}${coverImage}`;
  }

  getUpdateBooksUrl(): string {
    return this.endpoints.updateBooks;
  }

  getRecommendationsUrl(bookId: string): string {
    return this.endpoints.recommendations(bookId);
  }

  getThumbnailUploadUrl(): string {
    return this.endpoints.thumbnailUpload;
  }

  getPingUrl(): string {
    return this.endpoints.ping;
  }
}
