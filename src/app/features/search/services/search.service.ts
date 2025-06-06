import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // TODO merge with MatchProvidersService
  public static readonly GOOGLEBOOKS = 'googlebooks';
  public static readonly OPENLIBRARY = 'openlibrary';
  public static readonly AMAZON = 'amazon';
  public static readonly GOODREADS = 'goodreads';

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
      amazon: this.apiService.getSearchAmazonUrl(),
      goodreads: this.apiService.getSearchGoodreadsUrl(),
    };
    const apiUrl = apiUrls[where] || this.apiService.getSearchOpenlibraryUrl();
    return this.http.get<any>(
      `${apiUrl}?search_query=${encodeURIComponent(query)}&count=${count}`
    );
  }
}
