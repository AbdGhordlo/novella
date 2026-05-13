import {
  AddReviewParams,
  CreateUserParams,
  GetBooksParams,
  SignInParams,
} from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

// ─── Config ───────────────────────────────────────────────────────────────────

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.delta.platera",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "69e4e27d002ac9c66fc3",
  bucketId: "69f0ae31003d607e3240",
  // Collections
  userCollectionId: "user",
  booksCollectionId: "books",
  authorsCollectionId: "authors",
  categoriesCollectionId: "categories",
  reviewsCollectionId: "reviews",
  favoritesCollectionId: "favorites",
  bookCategoriesCollectionId: "book_categories",
  bookAuthorsCollectionId: "book_authors",
  userBooksCollectionId: "user_books",
};

// ─── Client ───────────────────────────────────────────────────────────────────

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

// ─── Storage helper ───────────────────────────────────────────────────────────

/**
 * Returns a preview URL for a book cover stored in Appwrite Storage.
 * Falls back gracefully if the fileId is already a full URL.
 */
export const getBookCoverUrl = (
  fileId: string,
  width = 400,
  height = 560,
): string => {
  if (!fileId) return "";
  // If it's already a full URL (e.g. from external source), return as-is
  if (fileId.startsWith("http")) return fileId;

  return storage
    .getFilePreviewURL(
      appwriteConfig.bucketId,
      fileId,
      width,
      height,
      ImageGravity.Center,
      85, // quality
    )
    .toString();
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed");

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl },
    );
  } catch (error) {
    console.error("createUser:", error);
    throw error;
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("signIn:", error);
    throw error;
  }
};

export const deleteCurrSession = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("deleteCurrSession:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    return result.documents[0] ?? null;
  } catch (error) {
    console.error("getCurrentUser:", error);
    throw error;
  }
};

// ─── Categories ───────────────────────────────────────────────────────────────

/** Fetch all categories, alphabetically sorted. */
export const getCategories = async () => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      [Query.orderAsc("name"), Query.limit(50)],
    );
    return result.documents;
  } catch (error) {
    console.error("getCategories:", error);
    throw error;
  }
};

// ─── Books ────────────────────────────────────────────────────────────────────

/**
 * Get books with optional category filter and/or full-text search.
 * Used by the Search page.
 *
 * NOTE: Appwrite full-text search requires a "Full-text" index on the
 * `title` (and optionally `description`) attribute in your Appwrite console.
 */
export const getBooks = async ({
  category,
  query,
  limit = 20,
  offset = 0,
}: GetBooksParams) => {
  try {
    const queries: string[] = [
      Query.limit(limit),
      Query.offset(offset),
      Query.orderDesc("$createdAt"), // newest first
    ];

    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("title", query));

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      queries,
    );
    console.log("getBooks:", JSON.stringify(result.documents, null, 2));
    return result.documents;
  } catch (error) {
    console.error("getBooks:", error);
    throw error;
  }
};

/**
 * Fetch a single book by its document ID.
 * Returns full details including related authors and categories
 * (Appwrite returns relationship fields automatically).
 */
export const getBook = async (bookId: string) => {
  try {
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      bookId,
    );
  } catch (error) {
    console.error("getBook:", error);
    throw error;
  }
};

/**
 * Fetch the N most recently added books.
 * Used for "New Arrivals" on the home screen.
 */
export const getNewArrivals = async (limit = 8) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(limit)],
    );
    return result.documents;
  } catch (error) {
    console.error("getNewArrivals:", error);
    throw error;
  }
};

/**
 * Fetch books belonging to a specific category.
 * Thin wrapper around getBooks for convenience.
 */
export const getBooksByCategory = async (categoryId: string, limit = 20) =>
  getBooks({ category: categoryId, limit });

/**
 * Fetch books written by a specific author.
 */
export const getBooksByAuthor = async (authorId: string, limit = 20) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      [
        Query.equal("authors", authorId),
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
      ],
    );
    return result.documents;
  } catch (error) {
    console.error("getBooksByAuthor:", error);
    throw error;
  }
};

// ─── Authors ──────────────────────────────────────────────────────────────────

/** Fetch all authors. */
export const getAuthors = async (limit = 50) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.authorsCollectionId,
      [Query.orderAsc("name"), Query.limit(limit)],
    );
    return result.documents;
  } catch (error) {
    console.error("getAuthors:", error);
    throw error;
  }
};

/** Fetch a single author by ID. */
export const getAuthor = async (authorId: string) => {
  try {
    return await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.authorsCollectionId,
      authorId,
    );
  } catch (error) {
    console.error("getAuthor:", error);
    throw error;
  }
};

// ─── Favorites ────────────────────────────────────────────────────────────────

/** Add a book to the current user's favorites. */
export const addToFavorites = async (userId: string, bookId: string) => {
  try {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.favoritesCollectionId,
      ID.unique(),
      { user_id: userId, book_id: bookId },
    );
  } catch (error) {
    console.error("addToFavorites:", error);
    throw error;
  }
};

/** Remove a favorite by its document ID. */
export const removeFromFavorites = async (favoriteDocId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.favoritesCollectionId,
      favoriteDocId,
    );
  } catch (error) {
    console.error("removeFromFavorites:", error);
    throw error;
  }
};

/** Get all favorited books for a user. */
export const getUserFavorites = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.favoritesCollectionId,
      [Query.equal("user_id", userId), Query.orderDesc("$createdAt")],
    );
    return result.documents; // each doc has book_id (related book doc)
  } catch (error) {
    console.error("getUserFavorites:", error);
    throw error;
  }
};

/**
 * Check whether a user has favorited a specific book.
 * Returns the favorite document (so you have the ID to delete it) or null.
 */
export const checkIsFavorite = async (
  userId: string,
  bookId: string,
): Promise<{ $id: string } | null> => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.favoritesCollectionId,
      [Query.equal("user_id", userId), Query.equal("book_id", bookId)],
    );
    return (result.documents[0] as { $id: string }) ?? null;
  } catch (error) {
    console.error("checkIsFavorite:", error);
    return null;
  }
};

// ─── Reviews ──────────────────────────────────────────────────────────────────

/** Get all reviews for a book, newest first. */
export const getBookReviews = async (bookId: string, limit = 20) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.reviewsCollectionId,
      [
        Query.equal("book_id", bookId),
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
      ],
    );
    return result.documents;
  } catch (error) {
    console.error("getBookReviews:", error);
    throw error;
  }
};

/**
 * Add or update a review for a book.
 * Checks for an existing review from the same user first to avoid duplicates.
 */
export const addReview = async ({
  userId,
  bookId,
  rating,
  comment,
}: AddReviewParams) => {
  try {
    // Check if user already has a review for this book
    const existing = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.reviewsCollectionId,
      [Query.equal("user_id", userId), Query.equal("book_id", bookId)],
    );

    const payload = { user_id: userId, book_id: bookId, rating, comment };

    if (existing.documents.length > 0) {
      // Update existing review
      return await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.reviewsCollectionId,
        existing.documents[0].$id,
        { rating, comment },
      );
    }

    // Create new review
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.reviewsCollectionId,
      ID.unique(),
      payload,
    );
  } catch (error) {
    console.error("addReview:", error);
    throw error;
  }
};

/** Delete a review by its document ID. */
export const deleteReview = async (reviewId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.reviewsCollectionId,
      reviewId,
    );
  } catch (error) {
    console.error("deleteReview:", error);
    throw error;
  }
};

/**
 * Get the current user's review for a specific book, or null.
 * Useful for showing/pre-filling the review form on a book detail page.
 */
export const getUserReviewForBook = async (userId: string, bookId: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.reviewsCollectionId,
      [Query.equal("user_id", userId), Query.equal("book_id", bookId)],
    );
    return result.documents[0] ?? null;
  } catch (error) {
    console.error("getUserReviewForBook:", error);
    return null;
  }
};
