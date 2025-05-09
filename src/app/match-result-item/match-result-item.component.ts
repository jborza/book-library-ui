import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-result-item',
  imports: [],
  templateUrl: './match-result-item.component.html',
  styleUrl: './match-result-item.component.less'
})
export class MatchResultItemComponent {
  @Input() result: any; // The individual search result item
  @Output() select = new EventEmitter<any>(); // Emit event when an item is selected

  onSelect(): void {
    this.select.emit(this.result); // Emit the selected item
  }
}
