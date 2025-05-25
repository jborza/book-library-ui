import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
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

  ngOnInit() {
    // Initialize any necessary data or state here
    console.log(
      'AddToCollectionComponent initialized with collections:',
      this.collections
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collections']) {
      // This block executes whenever the @Input() collections property changes
      const updatedCollections = changes['collections'].currentValue;
      console.log(
        'AddToCollectionComponent (OnChanges) - collections updated:',
        updatedCollections
      );
      this.collections = updatedCollections;
      // Now you can use the updatedCollections
      // If your component's display depends on this, you might need to trigger updates here.
    }
  }

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
