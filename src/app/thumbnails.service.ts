import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThumbnailsService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  uploadImage(formData: FormData): Observable<any> {
    const apiUrl = this.apiService.getThumbnailUploadUrl();
    return this.http.post(apiUrl, formData);
  }
}
