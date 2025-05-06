import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private apiUrl = 'http://localhost:5000/authors/api';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
