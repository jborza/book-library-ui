import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  imports: [],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.less'
})
export class ContextMenuComponent {
  @Input() x = 0; // X position of the menu
  @Input() y = 0; // Y position of the menu
  @Input() selectedBooks: any[] = []; // Selected books (single or multiple)
  @Output() action = new EventEmitter<string>(); // Emit actions like 'markAsFinished'

  onAction(action: string): void {
    this.action.emit(action); // Notify parent component of the selected action
  }
}
