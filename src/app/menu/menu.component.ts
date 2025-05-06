import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent {

  menuSections : Array<{
    title: string;
    items: Array<{ name: string; url: string; icon: string }>;
  }> = [
    {
      title: 'Library',
      items: [
        { name: 'Authors', url: '/authors', icon: '<i class="fas fa-user"></i>' },
        { name: 'Genres', url: '/genres', icon: '<i class="fas fa-book"></i>' }
      ]
    },
    {
      title: 'Collections',
      items: [
        { name: 'Ebooks', url: '/ebooks', icon: '<i class="fas fa-tablet-alt"></i>' },
        { name: 'Physical', url: '/physical', icon: '<i class="fas fa-book-open"></i>' },
        { name: 'Audiobooks', url: '/audiobooks', icon: '<i class="fas fa-headphones"></i>' }
      ]
    },
    {
      title: 'Tools',
      items: [
        { name: 'Import', url: '/import', icon: '<i class="fas fa-file-import"></i>' },
        { name: 'Export', url: '/export', icon: '<i class="fas fa-file-export"></i>' },
        { name: 'Add Book', url: '/add-book', icon: '<i class="fas fa-plus-circle"></i>' }
      ]
    }
  ];

  searchQueryOpenLibrary: string = '';
  searchQueryGoogleBooks: string = '';

  searchOpenLibrary(): void {
    console.log('Searching OpenLibrary with query:', this.searchQueryOpenLibrary);
    // Add actual search logic here
  }

  searchGoogleBooks(): void {
    console.log('Searching Google Books with query:', this.searchQueryGoogleBooks);
    // Add actual search logic here
  }
}