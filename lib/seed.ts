import { ID, Query } from "react-native-appwrite";

import { appwriteConfig, databases, storage } from "./appwrite";
import { authors, books, categories } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

type IdMap = Record<string, string>; // name → $id

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Deletes every document in a collection, paginating in chunks of 100.
 * Appwrite's default list limit is 25, so we need explicit pagination
 * to avoid leaving stale documents behind.
 */
async function clearCollection(collectionId: string): Promise<void> {
  console.log(`🧹 Clearing collection: ${collectionId}`);
  let deleted = 0;

  while (true) {
    const list = await databases.listDocuments(
      appwriteConfig.databaseId,
      collectionId,
      [Query.limit(100)],
    );

    if (list.documents.length === 0) break;

    await Promise.all(
      list.documents.map((doc) =>
        databases.deleteDocument(
          appwriteConfig.databaseId,
          collectionId,
          doc.$id,
        ),
      ),
    );

    deleted += list.documents.length;

    // If we got fewer than 100, there are no more pages
    if (list.documents.length < 100) break;
  }

  console.log(`  ✓ Deleted ${deleted} document(s) from ${collectionId}`);
}

async function clearBucket(): Promise<void> {
  console.log("🧹 Clearing storage bucket");
  const list = await storage.listFiles(appwriteConfig.bucketId);
  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id),
    ),
  );
  console.log(`  ✓ Deleted ${list.files.length} file(s)`);
}

/** Clears all collections in safe dependency order (children before parents). */
async function clearAll(): Promise<void> {
  console.log("🧹 Clearing all collections…");
  await clearCollection(appwriteConfig.bookCategoriesCollectionId);
  await clearCollection(appwriteConfig.bookAuthorsCollectionId);
  await clearCollection(appwriteConfig.favoritesCollectionId);
  await clearCollection(appwriteConfig.reviewsCollectionId);
  await clearCollection(appwriteConfig.userBooksCollectionId);
  await clearCollection(appwriteConfig.booksCollectionId);
  await clearCollection(appwriteConfig.authorsCollectionId);
  await clearCollection(appwriteConfig.categoriesCollectionId);
  await clearBucket();
  console.log("✓ All collections cleared\n");
}

// ─── Internal seeders ─────────────────────────────────────────────────────────

async function _seedCategories(): Promise<IdMap> {
  console.log("📂 Seeding categories…");
  const map: IdMap = {};

  for (const cat of categories) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      { name: cat.name, description: cat.description },
    );
    map[cat.name] = doc.$id;
    console.log(`  ✅ ${cat.name}`);
  }

  return map;
}

async function _seedAuthors(): Promise<IdMap> {
  console.log("✍️  Seeding authors…");
  const map: IdMap = {};

  for (const author of authors) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.authorsCollectionId,
      ID.unique(),
      {
        name: author.name,
        bio: author.bio,
        profileImage: author.profileImage,
      },
    );
    map[author.name] = doc.$id;
    console.log(`  ✅ ${author.name}`);
  }

  return map;
}

async function _seedBooks(categoryMap: IdMap, authorMap: IdMap): Promise<void> {
  console.log("📚 Seeding books…");

  for (const book of books) {
    // ── 1. Create the book document ───────────────────────────────────────
    // coverImage is stored as plain text (local @/ path) — no upload needed.
    const bookDoc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      ID.unique(),
      {
        title: book.title,
        description: book.description,
        coverImage: book.coverImage, // e.g. "@/assets/images/book-covers/dune-cover.jpg"
        publishedDate: book.publishedDate,
        language: book.language,
        pageCount: book.pageCount,
        isWebNovel: book.isWebNovel,
        price: book.price,
      },
    );
    console.log(`  ✅ ${book.title}`);

    // ── 2. Link categories ────────────────────────────────────────────────
    for (const catName of book.categoryNames) {
      const categoryId = categoryMap[catName];
      if (!categoryId) {
        console.warn(`    ⚠️  Unknown category "${catName}" — skipping`);
        continue;
      }
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookCategoriesCollectionId,
        ID.unique(),
        { books: bookDoc.$id, categories: categoryId },
      );
      console.log(`    🏷️  ${catName}`);
    }

    // ── 3. Link authors ───────────────────────────────────────────────────
    for (const authorName of book.authorNames) {
      const authorId = authorMap[authorName];
      if (!authorId) {
        console.warn(`    ⚠️  Unknown author "${authorName}" — skipping`);
        continue;
      }
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookAuthorsCollectionId,
        ID.unique(),
        { books: bookDoc.$id, authors: authorId },
      );
      console.log(`    🖊️  ${authorName}`);
    }
  }
}

// ─── Exported stage functions ─────────────────────────────────────────────────
// Call these from three separate buttons. Run them in order: 1 → 2 → 3.
// Stage 1 is the only one that clears the DB first.

/**
 * STAGE 1 — Clears the entire database, then seeds categories.
 * Always run this first when doing a fresh seed.
 */
export async function seedCategoriesStage(): Promise<void> {
  try {
    console.log("🌱 Stage 1: clearing DB + seeding categories…\n");
    // await clearAll();
    await _seedCategories();
    console.log("\n✅ Stage 1 complete — ready for Stage 2 (authors).");
  } catch (error) {
    console.error("\n❌ Stage 1 failed:", error);
    throw error;
  }
}

/**
 * STAGE 2 — Seeds authors.
 * Run after Stage 1. Does not touch categories or books.
 */
export async function seedAuthorsStage(): Promise<void> {
  try {
    console.log("🌱 Stage 2: seeding authors…\n");
    await _seedAuthors();
    console.log("\n✅ Stage 2 complete — ready for Stage 3 (books).");
  } catch (error) {
    console.error("\n❌ Stage 2 failed:", error);
    throw error;
  }
}

/**
 * STAGE 3 — Seeds books and links them to existing categories and authors.
 * Run after Stages 1 and 2. Fetches category and author IDs from the DB
 * so it does not depend on in-memory state from the earlier stages.
 */
export async function seedBooksStage(): Promise<void> {
  try {
    console.log("🌱 Stage 3: seeding books…\n");

    // ── Re-fetch category IDs from the live DB ────────────────────────────
    const catResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      [Query.limit(100)],
    );
    const categoryMap: IdMap = {};
    catResult.documents.forEach((doc) => {
      categoryMap[doc.name as string] = doc.$id;
    });
    console.log(`  📂 Loaded ${catResult.documents.length} categories from DB`);

    // ── Re-fetch author IDs from the live DB ──────────────────────────────
    const authResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.authorsCollectionId,
      [Query.limit(100)],
    );
    const authorMap: IdMap = {};
    authResult.documents.forEach((doc) => {
      authorMap[doc.name as string] = doc.$id;
    });
    console.log(
      `  ✍️  Loaded ${authResult.documents.length} authors from DB\n`,
    );

    await _seedBooks(categoryMap, authorMap);

    console.log("\n✅ Stage 3 complete — database fully seeded!");
  } catch (error) {
    console.error("\n❌ Stage 3 failed:", error);
    throw error;
  }
}
