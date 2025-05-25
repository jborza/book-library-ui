import { Component } from '@angular/core';
import { SettingsService } from '../settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSearchesComponent } from '../custom-searches/custom-searches.component';

@Component({
  selector: 'app-settings',
  imports: [CommonModule,
    FormsModule,
    CustomSearchesComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less'
})
export class SettingsComponent {
  pageSize: number = 40;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.pageSize = this.settingsService.getSetting('pageSize') || this.pageSize;
  }

  saveSettings(): void {
    this.settingsService.setSetting('pageSize', this.pageSize);
  }
}
