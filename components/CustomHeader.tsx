import { images } from "@/constants";
import { CustomHeaderProps } from "@/type";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View style={s.wrap}>
      {/* Back button */}
      <TouchableOpacity
        style={s.iconBtn}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Image
          source={images.arrowBack}
          style={s.icon}
          resizeMode="contain"
          tintColor="#7C6FFF"
        />
      </TouchableOpacity>

      {/* Title */}
      {title && <Text style={s.title}>{title}</Text>}

      {/* Search shortcut — right side balance */}
      <View style={[s.iconBtn, s.iconBtnMuted]}>
        <Image
          source={images.search}
          style={s.icon}
          resizeMode="contain"
          tintColor="#B0AECF"
        />
      </View>
    </View>
  );
};

export default CustomHeader;

// ─── Styles ───────────────────────────────────────────────────────────────────

const INK = "#1C1B2E";

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  // Shared pill button
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnMuted: {
    backgroundColor: "#F5F5F8",
  },
  icon: { width: 18, height: 18 },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
});
