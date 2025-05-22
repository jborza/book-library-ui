import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-icon-picker',
  imports: [CommonModule],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.less'
})
export class IconPickerComponent {
  icons: string[] = ['🌍', '🏔', '🏝','🏛','🏟','🏢','💒','🚌','✈','⌚','⚽','🕹','🎮','🎭','💎','🔊','🎧',
    '📱','📺','🔍','💰','📈','📊','✂','⚔','🔬','🛒','✔','❌','💤','👾',
    '📔','📕','📖','📗','📘','📙','📚','📓','📒','📃','📜','📄','📰','🗞','📑','🔖','🏷',
  ];

  @Output() iconSelected = new EventEmitter<any>();

  constructor() {
  }

  selectedIcon: string = '';

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.iconSelected.emit(this.selectedIcon);
  }
}
