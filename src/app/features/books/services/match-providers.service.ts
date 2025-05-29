import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchProvidersService {
  static readonly DEFAULT_PROVIDER = 'google_books';
  
  // List of match providers
  private providers = [
    { label: 'Google Books', value: 'google_books' },
    { label: 'Open Library', value: 'open_library' },
  ];

  constructor() {}

  // Method to get the list of providers
  getProviders() {
    return this.providers;
  }
}
