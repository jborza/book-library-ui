import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.less'],
  imports: [CommonModule]
})
export class BookItemComponent {
  @Input() sectionTitle!: string; // E.g., "Existing Book" or "Book to Add"
  @Input() bookData!: { title: string; author: string; type: string }; // Book data
  @Input() isMergeOptionVisible: boolean = false; // Whether to show merge/add options
}