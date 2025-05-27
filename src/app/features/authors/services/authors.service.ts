import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { BookFilter } from '../../books/book-filter';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient,
    private apiService: ApiService
  ) {}

  getAuthors(): Observable<any> {
    return this.http.get(this.apiService.getAuthorsUrl());
  }

  getAuthorsFiltered(search: BookFilter): Observable<any> {
    let params = search.getSearchParams();

    return this.http.get(this.apiService.getAuthorSearchsUrl(), { params });
  }
}
