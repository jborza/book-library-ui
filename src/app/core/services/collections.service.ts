import { Injectable } from '@angular/core';
import { Collection } from '../../features/collections/models/collection.model';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionsService {
  private collectionSavedSource = new Subject<void>();
  collectionSaved$ = this.collectionSavedSource.asObservable();

  constructor(private apiService: ApiService, private http: HttpClient) {}

  notifyCollectionSaved() {
    this.collectionSavedSource.next();
  }

  getCollections(): Observable<any> {
    // This method should return the list of collections.
    const url = this.apiService.getCollectionApiUrl();
    return this.http.get(url);
  }

  getCollectionsWithCovers(): Observable<any> {
    // This method should return the list of collections.
    const url = this.apiService.getCollectionsWithCoversApiUrl();
    return this.http.get(url);
  }

  createCollection(name: string): Observable<any> {
    // This method should create a new collection and return it.
    const url = this.apiService.getCollectionCreateApiUrl();
    return this.http.post(url, { name }).pipe(
      tap((newlyCreatedCollection) => {
        // This block executes when the HTTP POST is successful
        console.log(
          'Collection created successfully by service:',
          newlyCreatedCollection
        );
        this.collectionSavedSource.next(); // Notify all subscribers that a collection was added
      })
    );
  }

  addToCollection(collectionId: number, bookId: number): void {
    // This method should add a book to a collection.
    // For now, it does nothing as a placeholder.
    console.log(`Adding book ${bookId} to collection ${collectionId}`);
  }

  addBooksToCollection(
    collectionId: number,
    bookIds: number[]
  ): Observable<any> {
    // This method should add multiple books to a collection.
    // For now, it does nothing as a placeholder.
    const url = this.apiService.getCollectionAddBooksApiUrl(
      collectionId.toString()
    );
    return this.http.post(url, { book_ids: bookIds });
  }

  removeFromCollection(collectionId: number, bookId: number): void {
    // This method should remove a book from a collection.
    // For now, it does nothing as a placeholder.
    console.log(`Removing book ${bookId} from collection ${collectionId}`);
  }

  getCollectionsForBook(bookId: string): Observable<Collection[]> {
    // This method should return the collections for a specific book.
    const url = this.apiService.getCollectionsForBookApiUrl(bookId);
    return this.http.get<Collection[]>(url);
  }

  deleteCollection(collectionId: number): Observable<any> {
    // This method should delete a collection by its ID.
    const url = this.apiService.getCollectionDeleteApiUrl(collectionId.toString());
    return this.http.delete(url);
  }

  renameCollection(collectionId: number, newName: string): Observable<any> {
    // This method should rename a collection.
    const url = this.apiService.getCollectionRenameApiUrl(collectionId.toString());
    return this.http.post(url, { name: newName }).pipe(
      tap(() => {
        console.log(`Collection ${collectionId} renamed to ${newName}`);
        this.collectionSavedSource.next(); // Notify all subscribers that a collection was renamed
      })
    );
  }
}
