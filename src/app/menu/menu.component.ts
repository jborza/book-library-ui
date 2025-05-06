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
    items: Array<{ name: string; url: string; icon: string, queryParams?: { [key: string]: any } }>;
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
            {name: 'Ebooks', url: '/books', queryParams: { type: 'ebook' }, icon: '📲'},
            {name: 'Physical', url: '/books', queryParams: { type: 'physical' },  icon: '📙'},
            {name: 'Audiobooks', url: '/books', queryParams: { type: 'audiobook' }, icon: '🔊'}
        ]
    },
    {
        title: 'Status',
        items: [
            {name: 'Read', url: '/books', queryParams: {status: 'read'}, icon: '✔'},
            {name: 'To Read', url: '/books', queryParams: {status: 'to-read'}, icon: '🔜'},
            {name: 'Currently Reading', url: '/books', queryParams: {status: 'currently-reading'}, icon: '⌛'},
            {name: 'Wishist', url: '/books', queryParams: {status: 'wishlist'}, icon: '💡'}
        ]
    },
    {
        title: 'Tools',
        items: [
            {name: 'Import', url: '/import', icon: '📥'},
            {name: 'Export', url: '/export', icon: '📤'},
            {name: 'Test', url: '/test', icon: '🧪'},
        ]
    },
    {
        title:'',
        items: [
            {name: 'Add Book', url: '/add', icon: '➕'},
        ]
    }
  ];

  searchQueryOpenLibrary: string = 'the chronology of water';
  searchQueryGoogleBooks: string = 'Ukraine war';
  searchQuery: string = 'Architecture'; // Default value (can be empty or changed dynamically)

  constructor(private router: Router) {}

  onSearch(): void {
    // Navigate to the search route with the query parameter
    this.router.navigate(['/search'], { queryParams: { search_query: this.searchQuery } });
  }

  onSearchOpenLibrary(): void {
    this.router.navigate(['/search_external/'],
      { queryParams: {
        search_query: this.searchQueryOpenLibrary,
        count: 5,
        where: 'openlibrary'
       } });
  }

  onSearchGoogleBooks(): void {
    this.router.navigate(['/search_external/'],
      { queryParams: {
        search_query: this.searchQueryGoogleBooks,
        count: 5,
        where: 'googlebooks'
      } });  }
}