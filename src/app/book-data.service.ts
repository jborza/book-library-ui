import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  private selectedBookSource = new BehaviorSubject<any>(null);
  selectedBook$ = this.selectedBookSource.asObservable();

  setSelectedBook(book: any) {
    this.selectedBookSource.next(book);
  }

  clearSelectedBook() {
    this.selectedBookSource.next(null);
  }
}