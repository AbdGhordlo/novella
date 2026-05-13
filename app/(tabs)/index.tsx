import CartButton from "@/components/CartButton";
import { NEW_ARRIVALS, categories } from "@/constants";
import useAuthStore from "@/store/auth.store";
import React from "react";
import {
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

// ─── Placeholder data ─────────────────────────────────────────────────────────

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
      <View style={{ flex: 1 }}>
        <View style={s.heroBadge}>
          <Text style={s.heroBadgeText}>{"✦ THIS WEEK'S PICKS"}</Text>
        </View>
        <Text style={s.heroHeadline}>{"Your next\ngreat read\nawaits."}</Text>
        <TouchableOpacity style={s.heroCta} activeOpacity={0.85}>
          <Text style={s.heroCtaText}>Browse Now</Text>
        </TouchableOpacity>
      </View>

      <View style={s.stackWrap}>
        <View
          style={[
            s.stackCard,
            {
              backgroundColor: "#C5BAFF",
              transform: [{ rotate: "10deg" }],
              right: 2,
              top: 18,
            },
          ]}
        />
        <View
          style={[
            s.stackCard,
            {
              backgroundColor: "#C4D9FF",
              transform: [{ rotate: "4deg" }],
              right: 12,
              top: 8,
            },
          ]}
        />
        <View
          style={[
            s.stackCard,
            { backgroundColor: "#E8F9FF", right: 22, top: 0 },
          ]}
        >
          <View style={s.stackInner} />
        </View>
      </View>
    </View>
  );
}

function BookCard({ book }: { book: (typeof NEW_ARRIVALS)[0] }) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={s.bookCard}>
      <View style={[s.bookCover, { backgroundColor: book.color }]}>
        <Image
          source={book.cover}
          style={s.bookCoverImage}
          resizeMode="cover"
        />
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
      <View style={s.sectionRow}>
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
        {NEW_ARRIVALS.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Category Card — fanned book stack ───────────────────────────────────────

function CategoryCard({
  item,
  isOdd,
}: {
  item: (typeof categories)[0];
  isOdd: boolean;
}) {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff28" }}
      style={[
        s.catCard,
        { backgroundColor: item.color },
        isOdd && s.catCardOffset,
      ]}
    >
      {({ pressed }) => (
        <View style={[s.catInner, { opacity: pressed ? 0.87 : 1 }]}>
          {/* ── Decorative blob ── */}
          <View style={s.catBlob} />

          {/* ── Fanned book stack ── */}
          <View style={s.booksWrap}>
            {/* Left book — leans left, furthest back */}
            <View style={[s.book, s.bookLeft]}>
              <Image
                source={item.books[0]}
                style={s.bookImg}
                resizeMode="cover"
              />
              <View style={s.bookDarkTint} />
            </View>

            {/* Right book — leans right, middle layer */}
            <View style={[s.book, s.bookRight]}>
              <Image
                source={item.books[1]}
                style={s.bookImg}
                resizeMode="cover"
              />
              <View style={s.bookLightTint} />
            </View>

            {/* Center book — front, upright */}
            <View style={[s.book, s.bookCenter]}>
              <Image
                source={item.books[2]}
                style={s.bookImg}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* ── Footer: title only ── */}
          <View style={s.catFooter}>
            <View style={s.catDivider} />
            <Text style={s.catTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Index() {
  const { user } = useAuthStore();

  const categoryPairs: (typeof categories)[] = [];
  for (let i = 0; i < categories.length; i += 2) {
    categoryPairs.push(categories.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
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

        {/* ── Hero ── */}
        <HeroBanner />

        {/* ── New Arrivals ── */}
        <NewArrivals />

        {/* ── Explore Categories ── */}
        <View style={s.sectionRow}>
          <Text style={s.sectionTitle}>Explore Categories</Text>
          <TouchableOpacity>
            <Text style={s.seeAll}>See all →</Text>
          </TouchableOpacity>
        </View>

        <View style={s.catGrid}>
          {categoryPairs.map((pair, rowIdx) => (
            <View key={rowIdx} style={s.catRow}>
              {pair.map((item, colIdx) => (
                <View key={item.id} style={s.catCell}>
                  <CategoryCard item={item} isOdd={colIdx === 1} />
                </View>
              ))}
              {pair.length === 1 && <View style={s.catCell} />}
            </View>
          ))}
        </View>
      </ScrollView>
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

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 120, paddingHorizontal: 20 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 22,
  },
  greeting: { fontSize: 13, color: MUTED, fontWeight: "500", marginBottom: 2 },
  username: {
    fontSize: 26,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.5,
  },

  // Hero
  hero: {
    backgroundColor: INK,
    borderRadius: 28,
    padding: 24,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  heroBadge: {
    backgroundColor: LAVENDER,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  heroBadgeText: {
    color: INK,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  heroHeadline: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "900",
    lineHeight: 32,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroCta: {
    backgroundColor: PRIMARY,
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
  heroCtaText: { color: WHITE, fontWeight: "700", fontSize: 14 },
  stackWrap: { width: 110, height: 145, position: "relative" },
  stackCard: { position: "absolute", width: 84, height: 118, borderRadius: 12 },
  stackInner: {
    flex: 1,
    margin: 6,
    borderRadius: 8,
    backgroundColor: "#dce8ff",
  },

  // Section header
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
  seeAll: { color: PRIMARY, fontWeight: "600", fontSize: 13 },

  // New Arrivals book card
  bookCard: { width: 132 },
  bookCover: {
    width: 132,
    height: 188,
    borderRadius: 16,
    marginBottom: 10,
    overflow: "hidden",
  },
  bookCoverImage: {
    width: "100%",
    height: "100%",
  },
  coverShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  coverLineShort: {
    width: 30,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 2,
    marginBottom: 6,
  },
  coverLineLong: {
    width: 52,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
  },
  coverBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 12,
  },
  coverBottomText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 16,
  },
  bookTitle: { color: INK, fontSize: 13, fontWeight: "700", marginBottom: 2 },
  bookAuthor: { color: MUTED, fontSize: 12, marginBottom: 4 },
  bookPrice: { color: PRIMARY, fontSize: 13, fontWeight: "800" },

  // ── Category grid ──────────────────────────────────────────────────────────
  catGrid: { gap: 0, marginBottom: 32 },
  catRow: { flexDirection: "row", gap: 14, marginBottom: 14 },
  catCell: { flex: 1 },

  catCard: {
    borderRadius: 24,
    height: 200,
    // Clip the inner view but let the card itself not clip
    overflow: "hidden",
  },
  catCardOffset: { marginTop: 24 },

  catInner: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
  },

  // Blob: large soft circle in the top-right corner
  catBlob: {
    position: "absolute",
    top: -36,
    right: -36,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  // ── Fanned books ──────────────────────────────────────────────────────────
  booksWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Base book style — all three share this
  book: {
    position: "absolute",
    width: 60,
    height: 86,
    borderRadius: 9,
    overflow: "hidden",
  },

  // Left book: translate left → rotate so the top tilts left
  bookLeft: {
    transform: [{ translateX: -28 }, { translateY: 5 }, { rotate: "-20deg" }],
    zIndex: 1,
  },
  // Right book: translate right → rotate so the top tilts right
  bookRight: {
    transform: [{ translateX: 28 }, { translateY: 5 }, { rotate: "20deg" }],
    zIndex: 2,
  },
  // Center book: upright, on top
  bookCenter: {
    zIndex: 3,
    // iOS shadow for depth on the front book
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.28,
    shadowRadius: 7,
    elevation: 6,
  },

  bookImg: { width: "100%", height: "100%" },

  // Dark tint overlay on the furthest-back (left) book
  bookDarkTint: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.22)",
  },
  // Lighter tint on the right (middle-layer) book
  bookLightTint: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.10)",
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  catFooter: {
    paddingBottom: 15,
    paddingTop: 10,
  },
  catDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.28)",
    marginBottom: 9,
  },
  catTitle: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: -0.1,
  },
});
