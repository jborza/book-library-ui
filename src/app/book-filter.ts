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
  type: string = '';

  summarize(): string {
    let things = [];
    if (this.search)
      things.push('Search: ' + this.search)
    if (this.status)
      things.push(this.status)
    if (this.type)
      things.push(this.type)
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
}
