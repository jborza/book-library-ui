import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  standalone: true,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less'],
  imports: [CommonModule, RouterModule],
})
export class BookListComponent implements OnInit {
  books: Array<{ id: number; title: string }> = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    console.log('BookListComponent initialized');
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }
}