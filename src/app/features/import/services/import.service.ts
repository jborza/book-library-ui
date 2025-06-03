import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportService {


  constructor(private http: HttpClient,
              private apiService: ApiService
  ) { }

  importCsv(formData: FormData): Observable<any> {
    const apiUrl = this.apiService.getImportCsvUrl();
    return this.http.post(apiUrl, formData);
  }

  importCsvAll(formData: FormData): Observable<any> {
    const apiUrl = this.apiService.getImportCsvAllUrl();
    return this.http.post(apiUrl, formData);
  }

  importNotes(formData: FormData): Observable<any> {
    const apiUrl = this.apiService.getImportNotesUrl();
    return this.http.post(apiUrl, formData);
  }

  confirmImport(importResults: any) : Observable<any> {
    const apiUrl = this.apiService.getConfirmImportUrl();
    return this.http.post(apiUrl, importResults);
  }

  importDirectory(path: string) : Observable<any> {
    const apiUrl = this.apiService.getImportDirectoryUrl();
    let params = new HttpParams();
    params = params.set('path', path);
    return this.http.get(apiUrl, { params} );
  }

}
