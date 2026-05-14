import { useCartStore } from "@/store/cart.store";
import { Book } from "@/type";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BookCard = ({ item }: { item: Book }) => {
  const { addItem } = useCartStore();

  // ── Pull fields using the real Appwrite camelCase names ──────────────────
  const { $id, title, coverImage, bookCategories, isWebNovel } = item;

  // Resolve first category name from the junction relationship
  const categoryName =
    bookCategories?.[0]?.categories?.name ??
    (isWebNovel ? "Web Novel" : undefined);

  const handleAddToCart = () => {
    addItem({
      id: $id,
      name: title,
      price: 0, // swap for a real price field when you add it to the schema
      image_url: coverImage ?? "",
      customizations: [],
    });
  };

  return (
    <View
      style={[
        s.card,
        Platform.OS === "android" && { elevation: 6, shadowColor: "#C5BAFF" },
      ]}
    >
      {/* ── Cover ── */}
      <View style={s.coverWrap}>
        <View style={s.coverGlow} />
        {coverImage ? (
          <Image
            source={{ uri: coverImage }}
            style={s.coverImg}
            resizeMode="cover"
          />
        ) : (
          // Fallback when no cover is stored
          <View style={s.coverPlaceholder}>
            <Text style={s.coverPlaceholderText}>📖</Text>
          </View>
        )}

        {/* Web novel badge */}
        {isWebNovel && (
          <View style={s.webNovelBadge}>
            <Text style={s.webNovelBadgeText}>WEB</Text>
          </View>
        )}
      </View>

      {/* ── Info ── */}
      <View style={s.info}>
        {categoryName && (
          <View style={s.categoryChip}>
            <Text style={s.categoryChipText} numberOfLines={1}>
              {categoryName}
            </Text>
          </View>
        )}

        <Text style={s.title} numberOfLines={2}>
          {title}
        </Text>

        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={0.82}
          onPress={handleAddToCart}
        >
          <Text style={s.addBtnText}>Add +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookCard;

// ─── Styles ───────────────────────────────────────────────────────────────────

const WHITE = "#FFFFFF";
const PRIMARY = "#7C6FFF";
const LAVENDER = "#C5BAFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";

const s = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },

  // Cover
  coverWrap: {
    backgroundColor: "#EDE9FF",
    height: 155,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  coverGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: LAVENDER,
    opacity: 0.35,
  },
  coverImg: {
    width: "70%",
    height: "86%",
    borderRadius: 10,
  },
  coverPlaceholder: {
    width: "70%",
    height: "86%",
    borderRadius: 10,
    backgroundColor: "#DDD8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  coverPlaceholderText: { fontSize: 36 },

  // Badges
  webNovelBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#3C3C62",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  webNovelBadgeText: {
    color: WHITE,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  // Info
  info: { padding: 11, gap: 8 },

  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: "#EDE9FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  categoryChipText: {
    color: PRIMARY,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  title: {
    color: INK,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    letterSpacing: -0.1,
  },

  addBtn: {
    backgroundColor: "#EDE9FF",
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: "center",
  },
  addBtnText: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
