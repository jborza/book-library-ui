import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-language-select',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.less',
})
export class LanguageSelectComponent {
  languages = [
    { value: 'en', label: 'English', flag: 'https://flagcdn.com/gb.svg' },
    { value: 'de', label: 'German', flag: 'https://flagcdn.com/de.svg' },
    { value: 'sk', label: 'Slovak', flag: 'https://flagcdn.com/sk.svg' },
    { value: 'cz', label: 'Czech', flag: 'https://flagcdn.com/cz.svg' },
  ];

  selectedLanguage = 'en';
}
