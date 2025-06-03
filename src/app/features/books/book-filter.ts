import { HttpParams } from "@angular/common/http";

export class BookFilter {
  search: string = '';
  genre: string = '';
  language: string = '';
  yearEnabled: boolean = false;
  yearMin: number = 1900;
  yearMax: number = 2025;
  pagesEnabled: boolean = false;
  pagesMin: number = 0;
  pagesMax: number = 1000;
  ratingEnabled: boolean = false;
  ratingMin: number = 0;
  ratingMax: number = 5;
  bookType: string = '';
  author: string = '';
  series: string = '';
  status: string = '';
  // this is stupid, should have been outside of the class
  icon: string = '';
  collection: number | null = null;
  bookIds: number[] = [];

  summarize(): string {
    let things = [];
    if (this.search)
      things.push('Search: ' + this.search)
    if (this.status)
      things.push(this.status)
    if (this.bookType)
      things.push(this.bookType)
    if (this.genre)
      things.push('Genre: ' + this.genre)
    if (this.language)
      things.push(this.language)
    if (this.yearEnabled)
      things.push('Year: ' + this.yearMin + '-' + this.yearMax);
    if (this.pagesEnabled)
      things.push('Pages: ' + this.pagesMin + '-' + this.pagesMax);
    if (this.ratingEnabled)
      things.push('Rating: ' + this.ratingMin + '-' + this.ratingMax);
    if (this.author)
      things.push('Author: ' + this.author);
    if (this.series)
      things.push('Series: ' + this.series);
    return things.join(', ');
  }

  getSearchParams() : HttpParams {
      let params = new HttpParams();
      if (this?.search){
        params = params.set('search', this.search);
      }
      if (this?.status) {
        params = params.set('status', this.status);
      }
      if (this?.bookType) {
        params = params.set('type', this.bookType);
      }
      if (this?.search) {
        params = params.set('this', this.search);
      }
      if (this?.genre) {
        params = params.set('genre', this.genre);
      }
      if (this?.language) {
        params = params.set('language', this.language);
      }
      if (this?.yearEnabled) {
        if (this?.yearMin) {
          params = params.set('year_min', this.yearMin.toString());
        }
        if (this?.yearMax) {
          params = params.set('year_max', this.yearMax.toString());
        }
      }
      if (this?.pagesEnabled) {
        if (this?.pagesMin) {
          params = params.set('pages_min', this.pagesMin.toString());
        }
        if (this?.pagesMax) {
          params = params.set('pages_max', this.pagesMax.toString());
        }
      }
      if (this?.ratingEnabled) {
        if (this?.ratingMin) {
          params = params.set('rating_min', this.ratingMin.toString());
        }
        if (this?.ratingMax) {
          params = params.set('rating_max', this.ratingMax.toString());
        }
      }
      if (this?.author) {
        params = params.set('author', this.author);
      }
      if (this?.series) {
        params = params.set('series', this.series);
      }
     
      if (this?.collection) {
        params = params.set('collection', this.collection.toString());
      }
      if (this?.bookIds && this.bookIds.length > 0) {
        params = params.set('book_ids', this.bookIds.join(','));
      }
      return params;
    }
}
