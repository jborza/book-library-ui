import { Component } from '@angular/core';
import { CustomSearch } from '../../models/custom-search.model';
import { SettingsService } from '../../../../core/services/settings.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-searches',
  imports: [ CommonModule,
    FormsModule
  ],
  templateUrl: './custom-searches.component.html',
  styleUrl: './custom-searches.component.less'
})
export class CustomSearchesComponent {
customSearches: CustomSearch[] = [];
  newSearchTitle = '';
  newSearchUrl = '';

  constructor(private settingsService: SettingsService) {
    this.loadCustomSearches();
  }

  // Load the list of custom searches
  private loadCustomSearches(): void {
    this.customSearches = this.settingsService.getCustomSearches();
  }

  // Add a new custom search
  addCustomSearch(): void {
    if (this.newSearchTitle && this.newSearchUrl) {
      const newSearch = new CustomSearch(this.newSearchTitle, this.newSearchUrl);
      this.settingsService.addCustomSearch(newSearch);
      this.loadCustomSearches(); // Refresh the list
      this.newSearchTitle = '';
      this.newSearchUrl = '';
    }
  }

  // Remove a custom search
  removeCustomSearch(title: string): void {
    this.settingsService.removeCustomSearch(title);
    this.loadCustomSearches(); // Refresh the list
  }
}
