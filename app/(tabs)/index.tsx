import CartButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import useAuthStore from "@/store/auth.store";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

// ─── Placeholder data (swap with real data later) ────────────────────────────

const NEW_ARRIVALS = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: "$12.99",
    color: "#1e3a4a",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: "$14.99",
    color: "#3a1e4a",
  },
  {
    id: 3,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    price: "$11.99",
    color: "#4a1e1e",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: "$13.99",
    color: "#2e3a1e",
  },
];

const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Sci-Fi",
  "Romance",
  "Mystery",
  "Fantasy",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <View style={s.hero}>
      {/* Left copy */}
      <View style={{ flex: 1 }}>
        <View style={s.heroBadge}>
          <Text style={s.heroBadgeText}>✦ NEW ARRIVALS</Text>
        </View>
        <Text style={s.heroHeadline}>
          {"Discover\nYour Next\nFavourite Read"}
        </Text>
        <TouchableOpacity style={s.heroCta}>
          <Text style={s.heroCtaText}>Browse Now</Text>
        </TouchableOpacity>
      </View>

      {/* Stacked book covers — replace Views with real covers later */}
      <View style={s.stackContainer}>
        <View
          style={[
            s.stackCard,
            {
              backgroundColor: "#aa99ff",
              transform: [{ rotate: "9deg" }],
              right: 0,
              top: 14,
            },
          ]}
        />
        <View
          style={[
            s.stackCard,
            {
              backgroundColor: "#99bdff",
              transform: [{ rotate: "4deg" }],
              right: 10,
              top: 7,
            },
          ]}
        />
        <View
          style={[
            s.stackCard,
            { backgroundColor: "#80acff", right: 18, top: 0 },
          ]}
        >
          <View style={s.stackCardInner} />
        </View>
      </View>
    </View>
  );
}

function CategoryPills({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (c: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.pillsRow}
      style={{ marginBottom: 28 }}
    >
      {CATEGORIES.map((cat) => {
        const isActive = cat === active;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            style={[s.pill, isActive && s.pillActive]}
          >
            <Text style={[s.pillText, isActive && s.pillTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function BookCard({ book }: { book: (typeof NEW_ARRIVALS)[0] }) {
  return (
    <TouchableOpacity style={s.bookCard}>
      <View style={[s.bookCover, { backgroundColor: book.color }]}>
        {/* Decorative cover lines — replace with <Image> when you have covers */}
        <View style={s.coverAccent} />
        <View style={s.coverLines}>
          <View style={s.coverLine} />
          <View style={[s.coverLine, { width: 50, opacity: 0.25 }]} />
        </View>
        <View style={s.coverTitle}>
          <Text style={s.coverTitleText} numberOfLines={2}>
            {book.title}
          </Text>
        </View>
      </View>
      <Text style={s.bookTitle} numberOfLines={1}>
        {book.title}
      </Text>
      <Text style={s.bookAuthor}>{book.author}</Text>
      <Text style={s.bookPrice}>{book.price}</Text>
    </TouchableOpacity>
  );
}

function NewArrivals() {
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>New Arrivals</Text>
        <TouchableOpacity>
          <Text style={s.seeAll}>See all →</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14, paddingRight: 4 }}
      >
        {NEW_ARRIVALS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ScrollView>
    </View>
  );
}

function GenreCard({ item }: { item: (typeof offers)[0] }) {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff22" }}
      style={[s.genreCard, { backgroundColor: item.color }]}
    >
      {({ pressed }) => (
        <View style={[s.genreCardInner, { opacity: pressed ? 0.9 : 1 }]}>
          {/* Book image */}
          <View style={s.genreImageWrap}>
            <Image
              source={item.image}
              style={s.genreImage}
              resizeMode="contain"
            />
          </View>

          {/* Info */}
          <View style={s.genreInfo}>
            <View style={s.genreBadge}>
              <Text style={s.genreBadgeText}>GENRE</Text>
            </View>
            <Text style={s.genreTitle}>{item.title}</Text>
            <View style={s.genreExplore}>
              <Text style={s.genreExploreText}>Explore</Text>
              <Image
                source={images.arrowRight}
                style={s.genreArrow}
                resizeMode="contain"
                tintColor="#ffffff"
              />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────

export default function Index() {
  const { user } = useAuthStore();
  const [activeCategory, setActiveCategory] = React.useState("All");

  const ListHeader = () => (
    <View>
      {/* ── Top bar ── */}
      <View style={s.topBar}>
        <View>
          <Text style={s.greeting}>{getGreeting()} 👋</Text>
          <Text style={s.username}>
            {user?.name?.split(" ")[0] ?? "Reader"}
          </Text>
        </View>
        <CartButton />
      </View>

      {/* ── Search ── */}
      <TouchableOpacity style={s.searchBar}>
        <Text style={s.searchIcon}>🔍</Text>
        <Text style={s.searchPlaceholder}>Search books, authors...</Text>
      </TouchableOpacity>

      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Categories ── */}
      <Text style={[s.sectionTitle, { marginBottom: 14 }]}>
        Browse by Genre
      </Text>
      <CategoryPills active={activeCategory} onSelect={setActiveCategory} />

      {/* ── New Arrivals ── */}
      <NewArrivals />

      {/* ── Genre cards header ── */}
      <Text style={[s.sectionTitle, { marginBottom: 16 }]}>
        Shop by Category
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={s.screen}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GenreCard item={item} />}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CREAM = "#FAF7F2";
const INK = "#1a1410";
const MUTED = "#9c8e7e";
const GOLD = "#C9A84C";
const BORDER = "#e8e0d6";
const WHITE = "#ffffff";

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: CREAM },
  listContent: { paddingBottom: 112, paddingHorizontal: 20 },

  // ── Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  greeting: { fontSize: 13, color: MUTED, fontWeight: "500", marginBottom: 2 },
  username: { fontSize: 24, fontWeight: "800", color: INK },

  // ── Search
  searchBar: {
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: { fontSize: 16 },
  searchPlaceholder: { color: "#c4b8a8", fontSize: 15 },

  // ── Hero
  hero: {
    backgroundColor: INK,
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  heroBadge: {
    backgroundColor: GOLD,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  heroBadgeText: {
    color: INK,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  heroHeadline: {
    color: WHITE,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 18,
  },
  heroCta: {
    backgroundColor: GOLD,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 11,
    alignSelf: "flex-start",
  },
  heroCtaText: { color: INK, fontWeight: "700", fontSize: 13 },
  stackContainer: { width: 110, height: 140, position: "relative" },
  stackCard: { position: "absolute", width: 82, height: 116, borderRadius: 10 },
  stackCardInner: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#6b96f5",
    margin: 5,
  },

  // ── Section shared
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 19, fontWeight: "800", color: INK },
  seeAll: { color: GOLD, fontWeight: "600", fontSize: 13 },

  // ── Category pills
  pillsRow: { gap: 8, paddingRight: 4 },
  pill: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: BORDER,
  },
  pillActive: { backgroundColor: INK, borderColor: INK },
  pillText: { color: "#6b5f52", fontWeight: "600", fontSize: 13 },
  pillTextActive: { color: WHITE },

  // ── Book card
  bookCard: { width: 130 },
  bookCover: {
    width: 130,
    height: 185,
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
  },
  coverAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  coverLines: { padding: 14 },
  coverLine: {
    width: 32,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 2,
    marginBottom: 6,
  },
  coverTitle: { position: "absolute", bottom: 14, left: 14, right: 14 },
  coverTitleText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
  },
  bookTitle: { color: INK, fontSize: 13, fontWeight: "600", marginBottom: 2 },
  bookAuthor: { color: MUTED, fontSize: 12, marginBottom: 4 },
  bookPrice: { color: GOLD, fontSize: 13, fontWeight: "700" },

  // ── Genre card
  genreCard: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: "hidden",
    height: 200,
  },
  genreCardInner: { flex: 1, flexDirection: "row" },
  genreImageWrap: { width: "45%", padding: 16, paddingVertical: 12 },
  genreImage: { width: "100%", height: "100%" },
  genreInfo: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 22,
    paddingVertical: 24,
  },
  genreBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  genreBadgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  genreTitle: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: 14,
  },
  genreExplore: { flexDirection: "row", alignItems: "center", gap: 6 },
  genreExploreText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    fontWeight: "600",
  },
  genreArrow: { width: 16, height: 16 },
});
