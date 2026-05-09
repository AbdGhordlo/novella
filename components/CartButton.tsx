import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      style={s.btn}
      onPress={() => router.push("/cart")}
      activeOpacity={0.8}
    >
      <Image
        source={images.bag}
        style={s.icon}
        resizeMode="contain"
        tintColor={PRIMARY}
      />
      {totalItems > 0 && (
        <View style={s.badge}>
          <Text style={s.badgeText}>{totalItems > 9 ? "9+" : totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const BG_SOFT = "#EDE9FF";
const WHITE = "#FFFFFF";
// The badge border matches the screen background so it "punches out"
const SCREEN_BG = "#FBFBFB";

const s = StyleSheet.create({
  btn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: BG_SOFT,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { width: 22, height: 22 },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
    // White ring separates badge from button background
    borderWidth: 1.5,
    borderColor: SCREEN_BG,
  },
  badgeText: {
    color: WHITE,
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 11,
  },
});
