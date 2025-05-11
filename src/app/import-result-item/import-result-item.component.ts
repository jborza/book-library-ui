import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-import-result-item',
  imports: [],
  templateUrl: './import-result-item.component.html',
  styleUrl: './import-result-item.component.less'
})
export class ImportResultItemComponent {
  @Input() result: any; // Input to receive the result data
  @Output() action = new EventEmitter<string>(); // Output to emit an action (e.g., "add" or "merge")

  // Emit action when a button is clicked
  addBook(): void {
    this.action.emit('add');
  }

  mergeBook(): void {
    this.action.emit('merge');
  }
}
