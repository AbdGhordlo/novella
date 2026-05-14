import { Models } from "react-native-appwrite";

// ─── Core book document — field names match your Appwrite collection exactly ──

export interface Book extends Models.Document {
  title: string;
  description?: string;
  coverImage?: string; // full URL stored in Appwrite
  publishedDate?: string; // ISO datetime
  language?: string;
  pageCount?: number;
  isWebNovel?: boolean;

  // Populated via Appwrite relationships
  bookAuthors?: BookAuthor[];
  bookCategories?: BookCategory[];
}

// ─── Junction / relationship documents ───────────────────────────────────────

export interface BookAuthor extends Models.Document {
  authors?: Author;
}

export interface BookCategory extends Models.Document {
  categories?: Category;
}

// ─── Standalone collection documents ─────────────────────────────────────────

export interface Author extends Models.Document {
  name: string;
  bio?: string;
  profileImage?: string;
}

export interface Category extends Models.Document {
  name: string;
  description?: string;
}

export interface Review extends Models.Document {
  rating: number; // 1–5
  comment?: string;
  spoilerAlert?: boolean;
  books?: Book;
  user?: AppwriteUser;
}

export interface Favorite extends Models.Document {
  books?: Book;
  user?: AppwriteUser;
}

export interface UserBook extends Models.Document {
  books?: Book;
  user?: AppwriteUser;
}

// ─── Appwrite Auth user (from account.get()) ─────────────────────────────────

export interface AppwriteUser {
  $id: string;
  name: string;
  email: string;
  accountId?: string;
  avatar?: string;
}
