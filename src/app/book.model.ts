

export class Book {
  public static readonly READ = 'read';
  public static readonly TO_READ = 'to-read';
  public static readonly CURRENTLY_READING = 'currently-reading';
  public static readonly WISHLIST = 'wishlist';

  public static readonly PHYSICAL = 'physical';
  public static readonly EBOOK = 'ebook';
  public static readonly AUDIOBOOK = 'audiobook';

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
  pages?: string;
  series?: string;
  tags?: string;
  publisher?: string;
  author_surname?: string; // Added surname property
  notes?: string; // Added notes property

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.author_name = data.author_name;
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
    this.pages = data.page_count;
    this.series = data.series;
    this.tags = data.tags;
    this.publisher = data.publisher;
    this.notes = data.notes;
  }
}
