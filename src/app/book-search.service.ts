import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookSearchService {

   // BehaviorSubject to hold the current search value (initial value is an empty string)
  private searchValueSubject = new BehaviorSubject<string>('');

  // Observable for components to subscribe to
  searchValue$ = this.searchValueSubject.asObservable();

  // Method to update the search value
  setSearchValue(value: string): void {
    this.searchValueSubject.next(value); // Notify all subscribers of the new value
  }

  // Method to get the current search value (optional)
  getSearchValue(): string {
    return this.searchValueSubject.value;
  }
}
