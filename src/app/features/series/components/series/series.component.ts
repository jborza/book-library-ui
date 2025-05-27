import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.less',
})
export class SeriesComponent {
  // image is 128x200px, so
  seriesList: Array<{ name: string; cover_images: Array<string> }> = [];

  constructor(private seriesService: SeriesService, private router: Router) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data) => {
      console.log('Series:', data);
      this.seriesList = data.series;
    });
  }

  // Calculate the position of each image dynamically
  getImagePosition(index: number, total: number, name: string): string {
    const containerWidth = 400; /* 440 */ // Width of the container
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
