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
}
