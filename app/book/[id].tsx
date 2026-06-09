import { appwriteConfig, databases, getBook } from "@/lib/appwrite";
import { resolveCoverImage } from "@/lib/coverMap";
import { useCartStore } from "@/store/cart.store";
import { Book } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return "Unknown";
  return new Date(iso).getFullYear().toString();
}

function formatLanguage(lang?: string) {
  if (!lang) return "Unknown";
  return lang.charAt(0).toUpperCase() + lang.slice(1);
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.detailPill}>
      <Text style={s.detailPillLabel}>{label}</Text>
      <Text style={s.detailPillValue}>{value}</Text>
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────────────────────

export default function BookPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCartStore();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [authorsState, setAuthorsState] = useState<string[]>([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const loadBook = async () => {
      try {
        setLoading(true);

        const bookDoc = await getBook(id);

        console.log("BOOK:");
        console.log(JSON.stringify(bookDoc, null, 2));

        // ── Authors ───────────────────────────────

        const bookAuthors = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookAuthorsCollectionId,
          [Query.equal("books", id)],
        );

        const authorNames = await Promise.all(
          bookAuthors.documents.map(async (link) => {
            const author = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.authorsCollectionId,
              link.authors,
            );

            return author.name;
          }),
        );

        console.log("Authors:", authorNames);

        // ── Categories ───────────────────────────

        const bookCategories = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.bookCategoriesCollectionId,
          [Query.equal("books", id)],
        );

        const categoryNames = await Promise.all(
          bookCategories.documents.map(async (link) => {
            const category = await databases.getDocument(
              appwriteConfig.databaseId,
              appwriteConfig.categoriesCollectionId,
              link.categories,
            );

            return category.name;
          }),
        );

        console.log("Categories:", categoryNames);

        setAuthorsState(authorNames);
        setCategoriesState(categoryNames);
        setBook(bookDoc as Book);
      } catch (error) {
        console.error("getBook error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  // ── Derived fields ───────────────────────────────────────────────────────

  const authors =
    authorsState.length > 0 ? authorsState.join(", ") : "Unknown Author";

  const categories =
    categoriesState.length > 0 ? categoriesState : ["Uncategorized"];

  // Resolve the DB string → bundled asset (null → renders placeholder)
  const imageSource = resolveCoverImage(book?.coverImage);

  const handleAddToCart = () => {
    if (!book) return;
    addItem({
      id: book.$id,
      name: book.title,
      price: (book as any).price ?? 0,
      image_url: book.coverImage ?? "",
      customizations: [],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <SafeAreaView style={s.loadingScreen}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={s.loadingText}>Loading…</Text>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView style={s.loadingScreen}>
        <Text style={s.errorEmoji}>📭</Text>
        <Text style={s.errorTitle}>Book not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={s.backBtnFallback}
        >
          <Text style={s.backBtnFallbackText}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      {/* ── Sticky back button ─────────────────────────────────────────── */}
      <TouchableOpacity
        style={s.backBtn}
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Text style={s.backBtnText}>‹</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
      >
        {/* ── Cover hero ──────────────────────────────────────────────── */}
        <View style={s.hero}>
          {/* Blurred colour blobs as background */}
          <View style={[s.heroBlob, { backgroundColor: "#C5BAFF" }]} />
          <View style={[s.heroBlob2, { backgroundColor: "#C4D9FF" }]} />

          {book.coverImage ? (
            <Image source={imageSource} style={s.cover} resizeMode="contain" />
          ) : (
            <View style={s.coverPlaceholder}>
              <Text style={s.coverPlaceholderText}>📖</Text>
            </View>
          )}
        </View>

        {/* ── Content card ────────────────────────────────────────────── */}
        <View style={s.card}>
          {/* Category chips */}
          {categories.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.chipsRow}
              style={{ marginBottom: 14 }}
            >
              {categories.map((c) => (
                <View key={c} style={s.chip}>
                  <Text style={s.chipText}>{c}</Text>
                </View>
              ))}
              {book.isWebNovel && (
                <View style={[s.chip, s.webChip]}>
                  <Text style={[s.chipText, s.webChipText]}>Web Novel</Text>
                </View>
              )}
            </ScrollView>
          )}

          {/* Title + author */}
          <Text style={s.title}>{book.title}</Text>
          <Text style={s.author}>by {authors}</Text>

          {/* Price */}
          {(book as any).price != null && (
            <Text style={s.price}>
              ${((book as any).price as number).toFixed(2)}
            </Text>
          )}

          {/* Details row */}
          <View style={s.detailsRow}>
            <DetailPill label="Year" value={formatDate(book.publishedDate)} />
            <DetailPill
              label="Pages"
              value={book.pageCount ? `${book.pageCount}` : "—"}
            />
            <DetailPill
              label="Language"
              value={formatLanguage(book.language)}
            />
            <DetailPill
              label="Format"
              value={book.isWebNovel ? "Web Novel" : "Book"}
            />
          </View>

          {/* Divider */}
          <View style={s.divider} />

          {/* Description */}
          <Text style={s.sectionHeading}>About this book</Text>
          <Text style={s.description}>
            {book.description ?? "No description available."}
          </Text>

          {/* Spacer for the sticky bar */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* ── Sticky add-to-cart bar ───────────────────────────────────── */}
      <View style={s.stickyBar}>
        <TouchableOpacity
          style={[s.addBtn, added && s.addBtnDone]}
          activeOpacity={0.88}
          onPress={handleAddToCart}
        >
          <Text style={s.addBtnText}>
            {added ? "✓  Added to cart!" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const BG = "#FBFBFB";
const WHITE = "#FFFFFF";
const PRIMARY = "#7C6FFF";
const LAVENDER = "#C5BAFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";
const BORDER = "#EBEBF5";

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  loadingScreen: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: { color: MUTED, fontSize: 14 },
  errorEmoji: { fontSize: 48 },
  errorTitle: { fontSize: 18, fontWeight: "800", color: INK },
  backBtnFallback: {
    marginTop: 16,
    backgroundColor: "#EDE9FF",
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backBtnFallbackText: { color: PRIMARY, fontWeight: "700" },

  scroll: { paddingBottom: 40 },

  // Back button — floats top-left over the hero
  backBtn: {
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 26,
    left: 16,
    zIndex: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  backBtnText: {
    fontSize: 26,
    color: INK,
    lineHeight: 30,
    fontWeight: "300",
    marginTop: -2,
  },

  // Hero
  hero: {
    height: 320,
    backgroundColor: "#F0EDFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBlob: {
    position: "absolute",
    top: -60,
    left: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    opacity: 0.35,
  },
  heroBlob2: {
    position: "absolute",
    bottom: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.3,
  },
  cover: {
    width: 170,
    height: 250,
    borderRadius: 14,
    // Book shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
  },
  coverPlaceholder: {
    width: 170,
    height: 250,
    borderRadius: 14,
    backgroundColor: "#DDD8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  coverPlaceholderText: { fontSize: 52 },

  // Content card
  card: {
    backgroundColor: WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24, // pulls card up over hero slightly
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
    // Subtle top shadow
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },

  chipsRow: { gap: 8 },
  chip: {
    backgroundColor: "#EDE9FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipText: { color: PRIMARY, fontSize: 12, fontWeight: "700" },
  webChip: { backgroundColor: "#2e2e52" },
  webChipText: { color: WHITE },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: INK,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  author: { fontSize: 14, color: MUTED, fontWeight: "500", marginBottom: 12 },
  price: { fontSize: 22, fontWeight: "900", color: PRIMARY, marginBottom: 20 },

  // Details row
  detailsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  detailPill: {
    backgroundColor: BG,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: BORDER,
    minWidth: 72,
  },
  detailPillLabel: {
    fontSize: 10,
    color: MUTED,
    fontWeight: "600",
    marginBottom: 3,
    letterSpacing: 0.4,
  },
  detailPillValue: { fontSize: 13, color: INK, fontWeight: "800" },

  divider: { height: 1, backgroundColor: BORDER, marginVertical: 20 },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: INK,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  description: { fontSize: 14, color: MUTED, lineHeight: 22 },
  bulletPoint: { fontSize: 14, color: MUTED, lineHeight: 26 },

  // Sticky bar
  stickyBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  addBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 6,
  },
  addBtnDone: { backgroundColor: "#4CAF8A" },
  addBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
