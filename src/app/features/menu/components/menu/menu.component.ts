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
import { MenuSection } from '../../models/menu-section';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
})
export class MenuComponent {
  searchQueryOpenLibrary: string = '';
  searchQueryGoogleBooks: string = '';
  searchQuery: string = ''; // Default value (can be empty or changed dynamically)
  libraries: Library[] = [];
  isMenuVisible = true;
  searchProvider: string = SearchService.OPENLIBRARY; // Default search provider

  static readonly SAVED_SEARCHES = 1;
  static readonly COLLECTIONS = 2;

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private libraryEvents: LibraryEventsService,
    private menuService: MenuService,
    private collectionsService: CollectionsService
  ) {}

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

  loadLibraries(): void {
    //TODO shouldn't we subscribe to getLibraries?
    this.libraries = this.settingsService.getLibraries() || [];
    this.menuService.menuSections[
      MenuComponent.SAVED_SEARCHES
    ].items.length = 0;

    this.libraries.forEach((library) => {
      this.menuService.menuSections[MenuComponent.SAVED_SEARCHES].items.push({
        name: library.name,
        url: '/books',
        queryParams: library.filter,
        icon: library.filter.icon || '📖',
      });
    });
  }

  loadCollections(): void {
    this.menuService.menuSections[MenuComponent.COLLECTIONS].items.length = 0;
    this.collectionsService.getCollections().subscribe((collections) => {
      collections.forEach((collection: any) => {
        this.menuService.menuSections[MenuComponent.COLLECTIONS].items.push({
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

  onSearchExternal(): void {
    this.router.navigate(['/search/external/'], {
      queryParams: {
        search_query: this.searchQuery,
        count: 5,
        where: this.searchProvider,
      },
    });
  }

  get menuSections(): Array<MenuSection> {
    return this.menuService.menuSections;
  }
}
