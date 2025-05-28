export interface Collection {
  id: number;
  name: string;
  cover_images: string[]; // Array of cover image URLs
  description?: string; // Optional description field
  // Add other fields as needed
}