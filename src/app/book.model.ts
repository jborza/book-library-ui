export class Book {
    id!: number;
    title!: string;
    author_name!: string;
    year?: string;
    isbn?: string;
    rating?: string;
    book_type?: string;
    status?: string;
    genre?: string;
    language?: string;
    synopsis?: string;
    review?: string;
    cover_image?: string;
    cover_image_tiny?: string;
    page_count?: string;
    series?: string;
    tags?: string;
    publisher? : string;

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.author_name = data.author_name; // Map API response to camelCase
        this.year = data.year_published;
        this.isbn = data.isbn;
        this.rating = data.rating;
        this.book_type = data.book_type;
        this.status = data.status;
        this.genre = data.genre;
        this.language = data.language;
        this.synopsis = data.synopsis;
        this.review = data.review;
        this.cover_image = data.cover_image;
        this.cover_image_tiny = data.cover_image_tiny;
        this.page_count = data.page_count;
        this.series = data.series;
        this.tags = data.tags;
        this.publisher = data.publisher;
      }
}
