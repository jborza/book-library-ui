import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

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
}
