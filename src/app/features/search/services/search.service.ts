import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public static readonly GOOGLEBOOKS = 'googlebooks';
  public static readonly OPENLIBRARY = 'openlibrary';

  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  searchBooks(
    where: string,
    query: string,
    count: number = 10
  ): Observable<any> {
    const apiUrls: { [key: string]: string } = {
      googlebooks: this.apiService.getSearchGoogleBooksUrl(),
      openlibrary: this.apiService.getSearchOpenlibraryUrl(),
      // You can add more mappings here
    };
    const apiUrl = apiUrls[where] || this.apiService.getSearchOpenlibraryUrl();
    return this.http.get<any>(
      `${apiUrl}?search_query=${encodeURIComponent(query)}&count=${count}`
    );
  }
}
