import { Injectable } from '@angular/core';
import { Collection } from './add-to-collection/add-to-collection.component';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor() { }

  getCollections(): Collection[] {
    // This method should return the list of collections.
    // For now, returning an empty array as a placeholder.
    return [];
  }

  createCollection(name: string): Collection {
    // This method should create a new collection and return it.
    // For now, returning a dummy collection object.
    return { id: Date.now(), name };
  }

  addToCollection(collectionId: number, bookId: number): void {
    // This method should add a book to a collection.
    // For now, it does nothing as a placeholder.
    console.log(`Adding book ${bookId} to collection ${collectionId}`);
  }

  removeFromCollection(collectionId: number, bookId: number): void {
    // This method should remove a book from a collection.
    // For now, it does nothing as a placeholder.
    console.log(`Removing book ${bookId} from collection ${collectionId}`);
  }
}
