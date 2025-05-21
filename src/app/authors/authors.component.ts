import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthorsService } from '../authors.service';

@Component({
  selector: 'app-authors',
  imports: [CommonModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.less'
})
export class AuthorsComponent {
  authors: Array<{ name: string, surname: string }> = [];
  groupedAuthors: { [key: string]: string[] } = {}; // Authors grouped by the first letter of their surname
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private authorsService: AuthorsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe((data) => {
      console.log('Authors:', data);
      this.authors = data.authors;
      this.groupedAuthors = this.groupAuthorsByFirstLetter(this.authors);
    });
  }

  // Scroll to the selected group with an offset
  scrollTo(letter: string): void {
    const element = document.getElementById(`group-${letter}`);
    if (element) {
      const stickyNavHeight = this.scrollContainer.nativeElement.offsetHeight || 0; // Height of the sticky navigation bar
      const yOffset = -stickyNavHeight; // Negative offset to scroll above the element
      const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset; // Adjusted scroll position
      window.scrollTo({ top: yPosition, behavior: 'smooth' }); // Smooth scroll to the adjusted position
    }
  }

  // Group authors by the first letter of their surname
  groupAuthorsByFirstLetter(authors: { name: string; surname: string }[]): { [key: string]: string[] } {
    return authors.reduce((groups, author) => {
      if (!author.surname) return groups; // Skip if surname is not available
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