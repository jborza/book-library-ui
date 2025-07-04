import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuSection } from '../models/menu-section';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  private isMenuVisible = new BehaviorSubject<boolean>(true);
  menuVisibility$ = this.isMenuVisible.asObservable();

  menuSections: Array<MenuSection> = [
    {
      title: '',
      collapsible: false,
      expanded: true,
      items: [{ name: 'Books', url: '/', icon: '📚' }],
    },
    {
      title: 'Saved searches',
      collapsible: true,
      expanded: true,
      items: [],
    },
    {
      title: 'Collections',
      collapsible: true,
      expanded: true,
      items: [],
    },
    {
      title: 'Rating',
      collapsible: true,
      expanded: false,
      items: [
        {
          name: '',
          url: '/books',
          queryParams: { ratingMin: 5, ratingMax: 5, ratingEnabled: true },
          icon: '⭐️⭐️⭐️⭐️⭐️',
        },
        {
          name: '',
          url: '/books',
          queryParams: { ratingMin: 4, ratingMax: 4.9, ratingEnabled: true },
          icon: '⭐️⭐️⭐️⭐️',
        },
        {
          name: '',
          url: '/books',
          queryParams: { ratingMin: 3, ratingMax: 3.9, ratingEnabled: true },
          icon: '⭐️⭐️⭐️',
        },
        {
          name: '',
          url: '/books',
          queryParams: { ratingMin: 2, ratingMax: 2.9, ratingEnabled: true },
          icon: '⭐️⭐️',
        },
        {
          name: '',
          url: '/books',
          queryParams: { ratingMin: 0, ratingMax: 1.9, ratingEnabled: true },
          icon: '⭐️',
        },
      ],
    },
    {
      title: 'Language',
      collapsible: true,
      expanded: false,
      items: [
        {
          name: 'English',
          url: '/books',
          queryParams: { language: 'en' },
          icon: '🇬🇧',
        },
        {
          name: 'Slovak',
          url: '/books',
          queryParams: { language: 'sk' },
          icon: '🇸🇰',
        },
        {
          name: 'Czech',
          url: '/books',
          queryParams: { language: 'cs' },
          icon: '🇨🇿',
        },
        {
          name: 'German',
          url: '/books',
          queryParams: { language: 'de' },
          icon: '🇩🇪',
        }
      ],
    },
    {
      title: 'Library',
      collapsible: true,
      expanded: true,
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
      collapsible: true,
      expanded: true,
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
      collapsible: false,
      expanded: true,
      items: [
        { name: 'Import', url: '/import', icon: '📥' },
        { name: 'Export', url: '/export', icon: '📤' },
        { name: 'Test', url: '/test', icon: '🧪' },
        { name: 'Duplicate Titles', url: '/books/duplicate', icon: '🔍' },
      ],
    },
    {
      title: '',
      collapsible: false,
      expanded: true,
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
