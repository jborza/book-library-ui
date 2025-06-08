import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.less'
})
export class ContextMenuComponent {
  @Input() selectedBooks: any[] = []; // Selected books (single or multiple)
  @Output() action = new EventEmitter<string>(); // Emit actions like 'markAsFinished'
  @ViewChild('menu', { static: false }) menu!: ElementRef<HTMLDivElement>;
  menuPosition = { top: '0px', left: '0px' };
  isMenuOpen = false;

  onAction(action: string): void {
    this.action.emit(action); // Notify parent component of the selected action
  }

  constructor(private elementRef: ElementRef) {}

  openMenu(event: MouseEvent): void {
    event.preventDefault();
    this.isMenuOpen = true;
    setTimeout(() => this.positionMenu(event));
  }

  positionMenu(event: MouseEvent): void {
    // Calculate the desired position
    const menuWidth = this.menu.nativeElement.offsetWidth;
    const menuHeight = this.menu.nativeElement.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = event.clientX;
    let top = event.clientY;

    // Adjust if the menu overflows the viewport
    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth - 20; // Add some padding
    }

    if (top + menuHeight > viewportHeight) {
      top = viewportHeight - menuHeight - 20; // Add some padding
    }

    this.menuPosition = { top: `${top}px`, left: `${left}px` };
  }
}
