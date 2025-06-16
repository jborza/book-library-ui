import { Params } from "@angular/router";
import { Book } from "./models/book.model";

export interface TableColumn {
  name: string;
  value: keyof Book;
  visible: boolean;
  link?: (row: Book) => string;
  queryParams?: (row: Book) => Params;
  component?: string;
  width?: number;
}