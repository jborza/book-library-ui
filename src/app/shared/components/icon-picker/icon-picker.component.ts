import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-icon-picker',
  imports: [CommonModule],
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconPickerComponent),
      multi: true,
    },
  ],
})
export class IconPickerComponent {
  icons: string[] = ['🌍', '🏔', '🏝', '🏛', '🏟', '🏢', '💒', '🚌', '✈', '⌚', '⚽', '🕹', '🎮', '🎭', '💎', '🔊', '🎧',
    '📱', '📺', '🔍', '💰', '📈', '📊', '✂', '⚔', '🔬', '🛒', '✔', '❌', '💤', '👾','📁','📂','✒️','👔','🍹','🎓','📯','🎁',
    '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄', '📰', '🗞', '📑', '🔖', '🏷',
  ];

  @Output() iconSelected = new EventEmitter<any>();

  constructor() {
  }

  selectedIcon: string = '';

  selectIcon(icon: string): void {
    this.selectedIcon = icon;
    this.iconSelected.emit(this.selectedIcon);
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedIcon = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
