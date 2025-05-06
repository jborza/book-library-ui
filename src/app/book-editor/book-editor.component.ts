import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-editor',
  imports: [CommonModule],
  templateUrl: './book-editor.component.html',
  styleUrl: './book-editor.component.less'
})
export class BookEditorComponent implements OnInit {
  bookId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
  }

  saveChanges(): void {
    // TODO: Implement saving logic
  }
}