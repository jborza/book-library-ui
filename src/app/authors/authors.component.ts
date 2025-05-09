import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.less'
})
export class AuthorsComponent {
  authors: Array<{ name: string }> = [];

  constructor(private authorsService: AuthorsService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      console.log('Authors:', data);
      this.authors = data.authors;
    });
  }

  viewBooksByAuthor(authorName: string): void {
    this.router.navigate(['/books', authorName]);
  }

}
