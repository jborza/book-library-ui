import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private apiUrl = 'http://localhost:5000/genres/api';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
