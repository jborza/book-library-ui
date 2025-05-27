import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibraryEventsService {
  private librarySavedSource = new Subject<void>();
  librarySaved$ = this.librarySavedSource.asObservable();

  notifyLibrarySaved() {
    this.librarySavedSource.next();
  }
}
