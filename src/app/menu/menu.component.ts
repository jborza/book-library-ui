import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent {

  menuSections : Array<{
    title: string;
    items: Array<{ name: string; url: string; icon: string }>;
  }> = 
  [
    {
        title: '',
        items:[
            {name: 'Books', url: '/', icon: '📚'},
        ]
    },
    {
        title: 'Library',
        items:[
            {name: 'Authors', url: '/authors', icon: '👤'},
            {name: 'Genres', url: '/genres', icon: '🎭'},
        ]
    },
    {
        title: 'Collections',
        items: [
            {name: 'Ebooks', url: '/books?type=ebook', icon: '📲'},
            {name: 'Physical', url: '/books?type=physical', icon: '📙'},
            {name: 'Audiobooks', url: '/books?type=audiobook', icon: '🔊'}
        ]
    },
    {
        title: 'Status',
        items: [
            {name: 'Read', url: '/books?status=read', icon: '✔'},
            {name: 'To Read', url: '/books?status=to-read', icon: '🔜'},
            {name: 'Currently Reading', url: '/books?status=currently-reading', icon: '⌛'},
            {name: 'Wishist', url: '/books?status=wishlist', icon: '💡'}
        ]
    },
    {
        title: 'Tools',
        items: [
            {name: 'Import', url: '/import', icon: '📥'},
            {name: 'Export', url: '/export', icon: '📤'}
        ]
    },
    {
        title:'',
        items: [
            {name: 'Add Book', url: '/add', icon: '➕'},
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

  searchQuery: string = 'Architecture'; // Default value (can be empty or changed dynamically)

  constructor(private router: Router) {}

  onSearch(): void {
    // Navigate to the search route with the query parameter
    this.router.navigate(['/search'], { queryParams: { search_query: this.searchQuery } });
  }
}