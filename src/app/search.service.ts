import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private openlibraryApiUrl =  'http://localhost:5000/search/openlibrary_api';
  private googleBooksApiUrl =  'http://localhost:5000/search/google_books_api';

  constructor(private http: HttpClient) {}

    searchBooks(where:string, query: string, count:number): Observable<any> {
      const apiUrls: { [key: string]: string } = {
        googlebooks: this.googleBooksApiUrl,
        openlibrary: this.openlibraryApiUrl,
         // You can add more mappings here
      };
      const apiUrl = apiUrls[where] || this.openlibraryApiUrl;
      return this.http.get<any>(`${apiUrl}?search_query=${encodeURIComponent(query)}&count=${count}`);
    }
}
