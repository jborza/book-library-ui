import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GenresService } from '../core/services/genres.service';
@Component({
  selector: 'app-genres',
  imports: [CommonModule, RouterModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.less'
})
export class GenresComponent {
  genres: Array<{ name: string }> = [];

  constructor(private genresService: GenresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.genresService.getGenres().subscribe((data) => {
      console.log('Genres:', data);
      this.genres = data.genres;
    });
  }
}
