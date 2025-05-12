import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeriesService } from '../series.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-series',
  imports: [CommonModule, RouterModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.less'
})
export class SeriesComponent {
  seriesList: Array<{ name: string, books: Array<number> }> = [];

  constructor(private seriesService: SeriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe((data) => {
      console.log('Series:', data);
      this.seriesList = data.series;
    });
  }

}
