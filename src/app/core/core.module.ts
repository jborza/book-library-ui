import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Import any services that should be provided at the app level
import { ApiService } from './services/api.service';
import { AuthorsService } from './services/authors.service';
import { BookDataService } from './services/book-data.service';
import { CollectionsService } from './services/collections.service';
import { GenresService } from './services/genres.service';
import { PingService } from './services/ping.service';
import { SettingsService } from './services/settings.service';
import { ThumbnailsService } from './services/thumbnails.service';
import { LibraryEventsService } from './services/library-events.service';

@NgModule({
  imports: [
    HttpClientModule, // Import HttpClientModule for services that make HTTP requests
  ],
  providers: [
    ApiService,
    AuthorsService,
    BookDataService,
    CollectionsService,
    GenresService,
    PingService,
    SettingsService,
    ThumbnailsService,
    LibraryEventsService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}