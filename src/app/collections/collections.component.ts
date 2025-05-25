import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CollectionsService } from '../collections.service';

@Component({
  selector: 'app-collections',
  imports: [ CommonModule, RouterModule ],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.less'
})
export class CollectionsComponent {
  // TODO load collections from the service
  collections: any[] = []; // TODO type

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit(): void {
    this.collectionsService.getCollectionsWithCovers().subscribe((data) => {
      console.log('Collections:', data);
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
}
