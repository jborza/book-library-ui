import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.less'
})
export class AuthorsComponent {
  authors: Array<{ name: string, surname: string }> = [];
  uniqueInitials: string[] = [];
  initial: string = '';
  anchorAdded: Set<string> = new Set();
  anchorMap: { [letter: string]: boolean } = {};
  groupedAuthors: { [key: string]: string[] } = {}; // Authors grouped by the first letter of their surname

  constructor(private authorsService: AuthorsService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  getUniqueInitials(authors: Array<{ name: string, surname: string }>): string[] {
    const initials = new Set<string>();
    authors.forEach(author => {
      const initial = author.name.charAt(0).toUpperCase();
      initials.add(initial);
    });
    return Array.from(initials).sort();
  }

  ngOnInit(): void {
   
    this.authorsService.getAuthors().subscribe((data) => {
      console.log('Authors:', data);
      this.authors = data.authors;
      this.groupedAuthors = this.groupAuthorsByFirstLetter(this.authors);
    });
  }

  // Scroll to the selected group using ViewportScroller
  scrollTo(letter: string): void {
    this.viewportScroller.scrollToAnchor('group-' + letter); // Scroll to the anchor
  }

  // Group authors by the first letter of their surname
  groupAuthorsByFirstLetter(authors: { name: string; surname: string }[]): { [key: string]: string[] } {
    return authors.reduce((groups, author) => {
      const firstLetter = author.surname[0].toUpperCase(); // Get the first letter of the surname
      if (!groups[firstLetter]) {
        groups[firstLetter] = []; // Create a new group if it doesn't exist
      }
      groups[firstLetter].push(author.name); // Add the author's full name to the group
      return groups;
    }, {} as { [key: string]: string[] });
  }

  viewBooksByAuthor(authorName: string): void {
    this.router.navigate(['/books', authorName]);
  }
}