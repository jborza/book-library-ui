import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.less'
})
export class BookDetailsComponent implements OnInit {
  bookId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }
}