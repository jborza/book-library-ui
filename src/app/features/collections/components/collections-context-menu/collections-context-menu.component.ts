import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-collections-context-menu',
  imports: [CommonModule],
  templateUrl: './collections-context-menu.component.html',
  styleUrl: './collections-context-menu.component.less'
})
export class CollectionsContextMenuComponent {
  @Input() options: { label: string; action: string }[] = [];
  @Output() optionSelected = new EventEmitter<string>();

  onOptionClick(action: string): void {
    this.optionSelected.emit(action);
  }
}
