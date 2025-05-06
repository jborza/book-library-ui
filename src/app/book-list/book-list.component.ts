import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Array<{ id: number; title: string }> = [];

  ngOnInit(): void {
    // TODO: Fetch books from API
    this.books = [
      { id: 1, title: 'Sapiens: A Brief History of Humankind' },
      { id: 2, title: 'The Pragmatic Programmer' },
    ];
  }
}