import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorsService } from '../authors.service';


@Component({
  selector: 'app-authors',
  imports: [CommonModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.less'
})
export class AuthorsComponent {
  authors: Array<{ title: string }> = [];

  constructor(private authorsService: AuthorsService) {}
  
  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      this.authors = data.authors;
    });
  }

}
