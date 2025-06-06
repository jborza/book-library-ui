import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchProvidersService {
  static readonly DEFAULT_PROVIDER = 'google';
  // would use readonly, but don't know how to set it in the constructor
  static PROVIDERS : string[];

  // List of match providers
  private providers = [
    { label: 'Google Books', value: 'google' },
    { label: 'Open Library', value: 'openlibrary' },
    { label: 'Amazon', value: 'amazon' },
    { label: 'Goodreads', value: 'goodreads' },
  ];

  constructor() {
    // Initialize the providers if needed
    MatchProvidersService.PROVIDERS = this.providers.map(provider => provider.label);
  }

  // Method to get the list of providers
  getProviders() {
    return this.providers;
  }
}
