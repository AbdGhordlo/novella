import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// MenuItem may carry a `categories` relationship array from Appwrite
type MenuCardItem = MenuItem & {
  categories?: { $id: string; name: string }[];
};

const MenuCard = ({ item }: { item: MenuCardItem }) => {
  const { $id, cover_image, name, price } = item;
  const imageUrl = `${cover_image}`;
  const { addItem } = useCartStore();

  // First category name if available
  const categoryName = item.categories?.[0]?.name;

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
        <Image
          source={{ uri: imageUrl }}
          style={s.coverImg}
          resizeMode="cover"
        />
        {/* Price chip — top right */}
        <View style={s.priceChip}>
          <Text style={s.priceChipText}>${price}</Text>
        </View>
      </View>

      {/* ── Info ── */}
      <View style={s.info}>
        {/* Category pill — shown only if data is available */}
        {categoryName && (
          <View style={s.categoryChip}>
            <Text style={s.categoryChipText} numberOfLines={1}>
              {categoryName}
            </Text>
          </View>
        )}

        <Text style={s.title} numberOfLines={2}>
          {name}
        </Text>

        <TouchableOpacity
          style={s.addBtn}
          activeOpacity={0.82}
          onPress={() =>
            addItem({ id: $id, name, price, image_url, customizations: [] })
          }
        >
          <Text style={s.addBtnText}>Add +</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuCard;

// ─── Styles ───────────────────────────────────────────────────────────────────

const WHITE = "#FFFFFF";
const PRIMARY = "#7C6FFF";
const LAVENDER = "#C5BAFF";
const INK = "#1C1B2E";

const s = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    overflow: "hidden",
    // iOS shadow
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },

  // Cover area
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
  priceChip: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  priceChipText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  // Info block
  info: {
    padding: 11,
    gap: 8,
  },

  // Category chip (shown below cover)
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

  // Add to cart button
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
