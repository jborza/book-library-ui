import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
 constructor(private http: HttpClient,
    private apiService: ApiService
  ) { }

  getSeries(): Observable<any> {
    return this.http.get(this.apiService.getSeriesUrl());
  }

}
