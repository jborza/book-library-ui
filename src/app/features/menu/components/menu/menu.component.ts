import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../search/services/search.service';
import { SettingsService } from '../../../../core/services/settings.service';
import { Library } from '../../../books/library';
import { LibraryEventsService } from '../../../../core/services/library-events.service';
import { MenuService } from '../../services/menu.service';
import { CollectionsService } from '../../../../core/services/collections.service';

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
        title: 'Saved searches',
        items: [],
      },
      {
        title: 'Collections',
        items: [],
      },
      {
        title: 'Library',
        items: [
          { name: 'Authors', url: '/authors', icon: '👤' },
          { name: 'Genres', url: '/genres', icon: '🎭' },
          { name: 'Series', url: '/series', icon: '📦' },
          { name: 'Collections', url: '/collections', icon: '📒' },
          {
            name: 'Ebooks',
            url: '/books',
            queryParams: { bookType: 'ebook' },
            icon: '📲',
          },
          {
            name: 'Physical',
            url: '/books',
            queryParams: { bookType: 'physical' },
            icon: '📙',
          },
          {
            name: 'Audiobooks',
            url: '/books',
            queryParams: { bookType: 'audiobook' },
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
            name: 'Reading',
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
          { name: 'Add Book', url: '/books/add', icon: '➕' },
          { name: 'Settings', url: '/settings', icon: '⚙' },
        ],
      },
    ];

  searchQueryOpenLibrary: string = '';
  searchQueryGoogleBooks: string = '';
  searchQuery: string = ''; // Default value (can be empty or changed dynamically)
  libraries: Library[] = [];
  isMenuVisible = true;

  static readonly SAVED_SEARCHES = 1;
  static readonly COLLECTIONS = 2;

  constructor(private router: Router,
    private settingsService: SettingsService,
    private libraryEvents: LibraryEventsService,
    private menuService: MenuService,
    private collectionsService: CollectionsService,
  ) { }

  ngOnInit(): void {
    this.libraryEvents.librarySaved$.subscribe(() => {
      this.loadLibraries();
    });
    this.loadLibraries();
    this.menuService.menuVisibility$.subscribe((isVisible) => {
      this.isMenuVisible = isVisible;
    });
    this.collectionsService.collectionSaved$.subscribe(() => {
      this.loadCollections();
    });
    this.loadCollections();
  }

  loadLibraries() : void {
    //TODO shouldn't we subscribe to getLibraries?
    this.libraries = this.settingsService.getLibraries() || [];
    this.menuSections[MenuComponent.SAVED_SEARCHES].items.length = 0;

    this.libraries.forEach((library) => {
      this.menuSections[MenuComponent.SAVED_SEARCHES].items.push({
        name: library.name,
        url: '/books',
        queryParams: library.filter,
        icon: library.filter.icon || '📖',
      });
    });
  }

  loadCollections() : void {
    this.menuSections[MenuComponent.COLLECTIONS].items.length = 0;
    this.collectionsService.getCollections().subscribe((collections) => {
      collections.forEach((collection: any) => {
        this.menuSections[MenuComponent.COLLECTIONS].items.push({
          name: collection.name,
          url: '/books',
          queryParams: { collection: collection.id },
          icon: '📚', // TODO allow picking icons - IconPicker
        });
      });
    });
  }

  onSearch(): void {
    // Navigate to the search route with the query parameter
    this.router.navigate(['/books'], {
      queryParams: { search: this.searchQuery },
    });
  }

  onSearchOpenLibrary(): void {
    this.router.navigate(['/search/external/'], {
      queryParams: {
        search_query: this.searchQueryOpenLibrary,
        count: 5,
        where: SearchService.OPENLIBRARY,
      },
    });
  }

  onSearchGoogleBooks(): void {
    this.router.navigate(['/search/external/'], {
      queryParams: {
        search_query: this.searchQueryGoogleBooks,
        count: 5,
        where: SearchService.GOOGLEBOOKS,
      },
    });
  }
}
