import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionsService } from '../../../../core/services/collections.service';
import { Collection } from '../../models/collection.model';
import { CollectionsContextMenuComponent } from '../collections-context-menu/collections-context-menu.component';

@Component({
  selector: 'app-collections',
  imports: [CommonModule, RouterModule, CollectionsContextMenuComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.less'
})
export class CollectionsComponent {
  collections: Collection[] = [];
  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  selectedCollectionId: number | null = null;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit(): void {
    this.fetchCollections();
    document.addEventListener('click', this.hideContextMenu.bind(this));
  }


  ngOnDestroy(): void {
    document.removeEventListener('click', this.hideContextMenu.bind(this));
  }

  private fetchCollections() {
    this.collectionsService.getCollectionsWithCovers().subscribe((data) => {
      this.collections = data.collections;
    });
  }

  // Calculate the position of each image dynamically
  getImagePosition(index: number, total: number, name: string): string {
    const containerWidth = 400; // Width of the container
    const imageWidth = 128; // Width of each image
    const rightmost = containerWidth - imageWidth;
    const otherBooksWidth = rightmost / (total - 1);
    const left = index * otherBooksWidth;
    // special case if total is 1 or 2
    if (total === 1) {
      return `${(containerWidth - imageWidth) / 2}px`; // Center the image
    } else if (total === 2) {
      if (index === 0) {
        return `$36px`;
      } else {
        return `$236px`;
      }
    }
    return `${left}px`; // Return the left position as a string
  }

  onContextMenuAction(action: string, collectionId: number): void {
    if (action === 'rename') {
      this.renameCollection(collectionId);
    } else if (action === 'delete') {
      this.deleteCollection(collectionId);
    }
  }

  renameCollection(collectionId: number): void {
    const newName = prompt('Enter new name for the collection:');
    if (newName) {
      this.collectionsService.renameCollection(collectionId, newName).subscribe((data) => {
        console.log('Collection renamed:', data);
        this.fetchCollections();
      });
    }
  }

  deleteCollection(collectionId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      // TODO use a confirmation dialog instead of confirm
      this.collectionsService.deleteCollection(collectionId).subscribe((data) => {
        console.log('Collection deleted:', data);
        this.fetchCollections();
      });
    }
  }

  hideContextMenu(): void {
    this.contextMenuVisible = false;
    this.selectedCollectionId = null;
  }

  showContextMenu(event: MouseEvent, collection: any): void {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop propagation to avoid conflicts
    this.contextMenuVisible = true;
    this.contextMenuPosition = { x: event.clientX, y: event.clientY };
    this.selectedCollectionId = collection.id;
  }

  onRightClick(event: MouseEvent, collection: any): void {
    event.preventDefault(); // Prevent the browser's default context menu
    event.stopPropagation(); // Stop the event from propagating to the stretched link
    this.showContextMenu(event, collection);
  }
}
