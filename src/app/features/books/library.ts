import { BookFilter } from "./book-filter";

export interface Library {
  name: string;
  filter: BookFilter;
}