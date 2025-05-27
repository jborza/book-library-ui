import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  constructor(private http: HttpClient,
    private apiService: ApiService
  ) { }

  getGenres(): Observable<any> {
    return this.http.get(this.apiService.getGenresUrl());
  }

}
