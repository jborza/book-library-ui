import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Collection {
  id: number;
  name: string;
  // Add other fields as needed
}

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.less'],
  imports: [CommonModule, FormsModule],
})
export class AddToCollectionComponent {
  @Input() collections: Collection[] = [];
  @Input() selectedBookImages: string[] = []; // array of image URLs for preview
  @Input() selectedBooksCount: number = 0;

  newCollectionName = '';
  @Output() createCollection = new EventEmitter<string>();
  @Output() addToCollection = new EventEmitter<number>(); // emits collection id

  onCreateCollection() {
    if (this.newCollectionName.trim()) {
      this.createCollection.emit(this.newCollectionName.trim());
      this.newCollectionName = '';
    }
  }
  onSelectCollection(id: number) {
    this.addToCollection.emit(id);
  }
}
