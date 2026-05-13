import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import { authors, books, categories } from "./data";

// ─── Types ────────────────────────────────────────────────────────────────────

type IdMap = Record<string, string>; // name → $id

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function clearCollection(collectionId: string): Promise<void> {
  console.log(`🧹 Clearing collection: ${collectionId}`);
  const list = await databases.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
  );
  await Promise.all(
    list.documents.map((doc) =>
      databases.deleteDocument(
        appwriteConfig.databaseId,
        collectionId,
        doc.$id,
      ),
    ),
  );
}

async function clearBucket(): Promise<void> {
  console.log("🧹 Clearing storage bucket");
  const list = await storage.listFiles(appwriteConfig.bucketId);
  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile(appwriteConfig.bucketId, file.$id),
    ),
  );
}

/**
 * Fetches a remote image and uploads it to Appwrite Storage via the REST API.
 * Falls back to returning the original URL if the upload fails.
 */
async function uploadCoverImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const fileId = ID.unique();
    const filename =
      imageUrl.split("/").pop()?.split("?")[0] || `cover-${Date.now()}.jpg`;

    const formData = new FormData();
    formData.append("fileId", fileId);
    formData.append("file", blob as any, filename);

    const uploadResponse = await fetch(
      `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files`,
      {
        method: "POST",
        headers: {
          "X-Appwrite-Project": appwriteConfig.projectId,
          // ⚠️ Do NOT set Content-Type — fetch sets it with the multipart boundary
        },
        body: formData,
      },
    );

    if (!uploadResponse.ok) {
      const err = await uploadResponse.json();
      throw new Error(err.message ?? "Upload failed");
    }

    const fileData = await uploadResponse.json();
    return `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${fileData.$id}/view?project=${appwriteConfig.projectId}`;
  } catch (error) {
    console.warn(
      `⚠️  Image upload failed for ${imageUrl} — using original URL instead.`,
      error,
    );
    return imageUrl; // graceful fallback
  }
}

// ─── Seeding steps ────────────────────────────────────────────────────────────

async function seedCategories(): Promise<IdMap> {
  console.log("\n📂 Seeding categories…");
  const map: IdMap = {};

  for (const cat of categories) {
    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId,
      ID.unique(),
      { name: cat.name, description: cat.description },
    );
    map[cat.name] = doc.$id;
    console.log(`  ✅ Category: ${cat.name}`);
  }

  return map;
}

async function seedAuthors(): Promise<IdMap> {
  console.log("\n✍️  Seeding authors…");
  const map: IdMap = {};

  for (const author of authors) {
    let profileImage = author.profileImage;

    // Uncomment to upload profile images to Appwrite Storage:
    // profileImage = await uploadCoverImage(author.profileImage);

    const doc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.authorsCollectionId,
      ID.unique(),
      { name: author.name, bio: author.bio, profileImage },
    );
    map[author.name] = doc.$id;
    console.log(`  ✅ Author: ${author.name}`);
  }

  return map;
}

async function seedBooks(categoryMap: IdMap, authorMap: IdMap): Promise<void> {
  console.log("\n📚 Seeding books…");

  for (const book of books) {
    // ── 1. Upload cover image (or use URL as-is) ──────────────────────────
    console.log(`  📤 Uploading cover for "${book.title}"…`);
    const coverImage = await uploadCoverImage(book.coverImage);

    // ── 2. Create the book document ───────────────────────────────────────
    const bookDoc = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.booksCollectionId,
      ID.unique(),
      {
        title: book.title,
        description: book.description,
        coverImage,
        publishedDate: book.publishedDate,
        language: book.language,
        price: book.price,
        pageCount: book.pageCount,
        isWebNovel: book.isWebNovel,
      },
    );
    console.log(`  ✅ Book: ${book.title}`);

    // ── 3. Link categories via book_categories junction ───────────────────
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
      console.log(`    🏷️  Linked category: ${catName}`);
    }

    // ── 4. Link authors via book_authors junction ─────────────────────────
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
      console.log(`    🖊️  Linked author: ${authorName}`);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed(): Promise<void> {
  try {
    console.log("🌱 Starting Novella database seed…\n");

    // ── 1. Clear existing data (order matters — junction tables first) ─────
    await clearCollection(appwriteConfig.bookCategoriesCollectionId);
    await clearCollection(appwriteConfig.bookAuthorsCollectionId);
    await clearCollection(appwriteConfig.favoritesCollectionId);
    await clearCollection(appwriteConfig.reviewsCollectionId);
    await clearCollection(appwriteConfig.userBooksCollectionId);
    await clearCollection(appwriteConfig.booksCollectionId);
    await clearCollection(appwriteConfig.authorsCollectionId);
    await clearCollection(appwriteConfig.categoriesCollectionId);
    await clearBucket();

    // ── 2. Seed in dependency order ───────────────────────────────────────
    const categoryMap = await seedCategories();
    const authorMap = await seedAuthors();
    await seedBooks(categoryMap, authorMap);

    console.log("\n✅ Seeding complete!");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    throw error;
  }
}

export default seed;
