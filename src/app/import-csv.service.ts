import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportCsvService {
  constructor(private http: HttpClient,
              private apiService: ApiService
  ) { }

  importCsv(formData: FormData): Observable<any> {
    // Replace with your actual API endpoint
    const apiUrl = this.apiService.getImportCsvUrl();
    return this.http.post(apiUrl, formData);
  }
}
