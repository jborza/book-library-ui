import { ParamMap } from "@angular/router";

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

  generateUrlParams(): string {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(this)) {
      params.set(key, String(value));
    }
    return params.toString();
  }

  loadFromUrlParams(urlParams: ParamMap): void {
    const filter = this;
    Object.keys(this).forEach(key => {
        const value = urlParams.get(key);

        if (value !== null) {
          // Type handling:
          if (typeof (filter as any)[key] === 'boolean') {
            (filter as any)[key] = value === 'true';
          } else if (typeof (filter as any)[key] === 'number') {
            (filter as any)[key] = Number(value);
          } else {
            (filter as any)[key] = value;
          }
        }
      });
  }
}
