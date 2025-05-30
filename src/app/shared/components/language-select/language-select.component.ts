import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Language {
  code: string;
  name: string;
  flagUrl: string;
}

@Component({
  selector: 'app-language-select',
  imports: [FormsModule, CommonModule],
  standalone: true,
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
  @Input() placeholder: string = 'Select a language';
  @Input() disabled: boolean = false;
  @Output() languageSelected = new EventEmitter<Language>();
  selectedLanguage: Language | null = null;
  isOpen = false;

  languages: Language[] = [
    { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/24x18/us.png' },
    { code: 'sk', name: 'Slovak', flagUrl: 'https://flagcdn.com/24x18/sk.png' },
    { code: 'cs', name: 'Czech', flagUrl: 'https://flagcdn.com/24x18/cz.png' },
    { code: 'de', name: 'German', flagUrl: 'https://flagcdn.com/24x18/de.png' },
    { code: 'fr', name: 'French', flagUrl: 'https://flagcdn.com/24x18/fr.png' },
    { code: 'es', name: 'Spanish', flagUrl: 'https://flagcdn.com/24x18/es.png' },
    { code: 'it', name: 'Italian', flagUrl: 'https://flagcdn.com/24x18/it.png' },
    { code: 'pt', name: 'Portuguese', flagUrl: 'https://flagcdn.com/24x18/pt.png' },
    { code: 'ru', name: 'Russian', flagUrl: 'https://flagcdn.com/24x18/ru.png' },
    { code: 'ja', name: 'Japanese', flagUrl: 'https://flagcdn.com/24x18/jp.png' },
    { code: 'ko', name: 'Korean', flagUrl: 'https://flagcdn.com/24x18/kr.png' },
    { code: 'zh', name: 'Chinese', flagUrl: 'https://flagcdn.com/24x18/cn.png' },
    { code: 'ar', name: 'Arabic', flagUrl: 'https://flagcdn.com/24x18/sa.png' },
    { code: 'hi', name: 'Hindi', flagUrl: 'https://flagcdn.com/24x18/in.png' },
    { code: 'nl', name: 'Dutch', flagUrl: 'https://flagcdn.com/24x18/nl.png' },
    { code: 'sv', name: 'Swedish', flagUrl: 'https://flagcdn.com/24x18/se.png' },
    { code: 'no', name: 'Norwegian', flagUrl: 'https://flagcdn.com/24x18/no.png' },
    { code: 'da', name: 'Danish', flagUrl: 'https://flagcdn.com/24x18/dk.png' },
    { code: 'fi', name: 'Finnish', flagUrl: 'https://flagcdn.com/24x18/fi.png' },
    { code: 'pl', name: 'Polish', flagUrl: 'https://flagcdn.com/24x18/pl.png' },
  ];

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

   // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value && value !== '') {
      // Find the language by code or full object
      if (typeof value === 'string') {
        this.selectedLanguage = this.languages.find(lang => lang.code === value) || null;
      } else if (value && value.code) {
        this.selectedLanguage = value;
      } else {
        this.selectedLanguage = null;
      }
    } else {
      this.selectedLanguage = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown() {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.onTouched(); // Mark as touched when opened
    }
  }

  selectLanguage(language: Language) {
    if (this.disabled) return;
    
    this.selectedLanguage = language;
    this.isOpen = false;
    
    // Emit the language code (or full object based on your preference)
    this.onChange(language.code); // or this.onChange(language) for full object
    this.languageSelected.emit(language);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }
}
