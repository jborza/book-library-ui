import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImportDataService {
  private importResults: any[] = [];

  setImportResults(results: any[]): void {
    this.importResults = results;
  }

  getImportResults(): any[] {
    return this.importResults;
  }

  clearImportResults(): void {
    this.importResults = [];
  }
  constructor() { }
}
