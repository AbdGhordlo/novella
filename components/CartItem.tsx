import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View style={s.wrap}>
      {/* ── Book cover ── */}
      <View style={s.imgWrap}>
        <Image
          source={{ uri: item.image_url }}
          style={s.img}
          resizeMode="cover"
        />
      </View>

      {/* ── Info ── */}
      <View style={s.info}>
        <Text style={s.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={s.price}>${item.price}</Text>

        {/* ── Quantity controls ── */}
        <View style={s.qtyRow}>
          <TouchableOpacity
            style={s.qtyBtn}
            onPress={() => decreaseQty(item.id, item.customizations!)}
            activeOpacity={0.7}
          >
            <Image
              source={images.minus}
              style={s.qtyIcon}
              resizeMode="contain"
              tintColor={PRIMARY}
            />
          </TouchableOpacity>

          <Text style={s.qtyText}>{item.quantity}</Text>

          <TouchableOpacity
            style={s.qtyBtn}
            onPress={() => increaseQty(item.id, item.customizations!)}
            activeOpacity={0.7}
          >
            <Image
              source={images.plus}
              style={s.qtyIcon}
              resizeMode="contain"
              tintColor={PRIMARY}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Delete ── */}
      <TouchableOpacity
        style={s.deleteBtn}
        onPress={() => removeItem(item.id, item.customizations!)}
        activeOpacity={0.7}
      >
        <Image
          source={images.trash}
          style={s.deleteIcon}
          resizeMode="contain"
          tintColor="#C5BAFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const INK = "#1C1B2E";

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 14,
  },

  // Cover
  imgWrap: {
    width: 78,
    height: 106,
    borderRadius: 13,
    backgroundColor: "#EDE9FF",
    overflow: "hidden",
    flexShrink: 0,
  },
  img: { width: "100%", height: "100%" },

  // Info column
  info: { flex: 1, gap: 3 },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: INK,
    lineHeight: 20,
  },
  price: {
    fontSize: 15,
    fontWeight: "800",
    color: PRIMARY,
    marginTop: 1,
  },

  // Qty row
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyIcon: { width: 11, height: 11 },
  qtyText: {
    fontSize: 15,
    fontWeight: "800",
    color: INK,
    minWidth: 20,
    textAlign: "center",
  },

  // Delete button
  deleteBtn: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#F5F0FF",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deleteIcon: { width: 18, height: 18 },
});
