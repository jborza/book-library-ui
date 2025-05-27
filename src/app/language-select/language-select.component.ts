import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-language-select',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageSelectComponent),
      multi: true,
    },
  ],
})
export class LanguageSelectComponent {
  languages = [
    { value: 'en', label: 'English', flag: 'https://flagcdn.com/gb.svg' },
    { value: 'de', label: 'German', flag: 'https://flagcdn.com/de.svg' },
    { value: 'sk', label: 'Slovak', flag: 'https://flagcdn.com/sk.svg' },
    { value: 'cz', label: 'Czech', flag: 'https://flagcdn.com/cz.svg' },
  ];

  selectedLanguage = 'en';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};
  writeValue(value: string): void {
    console.log('writeValue called with:', value);
    this.selectedLanguage = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if necessary
  }
}
