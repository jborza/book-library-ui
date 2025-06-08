import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuSection } from '../models/menu-section';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() { }

  private isMenuVisible = new BehaviorSubject<boolean>(true);
  menuVisibility$ = this.isMenuVisible.asObservable();

  menuSections: Array<MenuSection> = [
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
          { name: 'Duplicate Titles', url: '/books/duplicate', icon: '🔍' },
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

  get isMenuOpen(): boolean {
    return this.isMenuVisible.value;
  }

  toggleMenu() {
    this.isMenuVisible.next(!this.isMenuVisible.value);
  }

  hideMenu() {
    this.isMenuVisible.next(false);
  }

  showMenu() {
    this.isMenuVisible.next(true);
  }

}
