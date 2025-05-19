import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search.service';
import { SettingsService } from '../settings.service';
import { generateUrlParams } from '../url-parameters';
import { Library } from '../library';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  menuSections: Array<{
    title: string;
    items: Array<{
      name: string;
      url: string;
      icon: string;
      queryParams?: { [key: string]: any };
    }>;
  }> = [
    {
      title: '',
      items: [{ name: 'Books', url: '/', icon: '📚' }],
    },
    {
      title: 'Library',
      items: [
        { name: 'Authors', url: '/authors', icon: '👤' },
        { name: 'Genres', url: '/genres', icon: '🎭' },
        { name: 'Series', url: '/series', icon: '📦' },
      ],
    },
    {
      title: 'Libraries',
      items: [],
    },
    {
      title: 'Collections',
      items: [
        {
          name: 'Ebooks',
          url: '/books',
          queryParams: { type: 'ebook' },
          icon: '📲',
        },
        {
          name: 'Physical',
          url: '/books',
          queryParams: { type: 'physical' },
          icon: '📙',
        },
        {
          name: 'Audiobooks',
          url: '/books',
          queryParams: { type: 'audiobook' },
          icon: '🔊',
        },
      ],
    },
    {
      title: 'Status',
      items: [
        {
          name: 'Read',
          url: '/books',
          queryParams: { status: 'read' },
          icon: '✔',
        },
        {
          name: 'To Read',
          url: '/books',
          queryParams: { status: 'to-read' },
          icon: '🔜',
        },
        {
          name: 'Currently Reading',
          url: '/books',
          queryParams: { status: 'currently-reading' },
          icon: '⌛',
        },
        {
          name: 'Wishlist',
          url: '/books',
          queryParams: { status: 'wishlist' },
          icon: '💡',
        },
      ],
    },
    {
      title: 'Tools',
      items: [
        { name: 'Import', url: '/import', icon: '📥' },
        { name: 'Export', url: '/export', icon: '📤' },
        { name: 'Test', url: '/test', icon: '🧪' },
      ],
    },
    {
      title: '',
      items: [
        { name: 'Add Book', url: '/add', icon: '➕' },
        { name: 'Settings', url: '/settings', icon: '⚙' },
      ],
    },
  ];

  searchQueryOpenLibrary: string = '';
  searchQueryGoogleBooks: string = '';
  searchQuery: string = ''; // Default value (can be empty or changed dynamically)
  libraries: Library[] = [];

  constructor(private router: Router,
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    // load user libraries
    this.libraries = this.settingsService.getLibraries() || [];

    // hack them into the menu
    this.libraries.forEach((library) => {
    // obtain a link for each library
      const urlParams = generateUrlParams(library.filter);
      this.menuSections[2].items.push({
        name: library.name,
        url: '/books',
        queryParams: { urlParams },
        icon: '🏛️',
      });
    });
  }

  onSearch(): void {
    // Navigate to the search route with the query parameter
    this.router.navigate(['/search'], {
      queryParams: { search_query: this.searchQuery },
    });
  }

  onSearchOpenLibrary(): void {
    this.router.navigate(['/search_external/'], {
      queryParams: {
        search_query: this.searchQueryOpenLibrary,
        count: 5,
        where: SearchService.OPENLIBRARY,
      },
    });
  }

  onSearchGoogleBooks(): void {
    this.router.navigate(['/search_external/'], {
      queryParams: {
        search_query: this.searchQueryGoogleBooks,
        count: 5,
        where: SearchService.GOOGLEBOOKS,
      },
    });
  }
}
