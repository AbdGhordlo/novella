import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const HERO_HEIGHT = Dimensions.get("window").height * 0.38;

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href={"/"} />;

  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero section ── */}
        <View style={[s.hero, { height: HERO_HEIGHT }]}>
          {/* Background graphic */}
          <ImageBackground
            source={images.loginGraphic}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />

          {/* Dark overlay so the logo stays readable */}
          <View style={s.heroOverlay} />

          {/* Decorative blobs (same language as the profile card) */}
          <View style={s.blobTL} />
          <View style={s.blobBR} />

          {/* Logo */}
          <View style={s.logoWrap}>
            <Image source={images.logo} style={s.logo} resizeMode="contain" />
          </View>
        </View>

        {/* ── Form card (rendered by Slot) ── */}
        <View style={s.card}>
          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const BG = "#FBFBFB";
const INK = "#1C1B2E";
const PRIMARY = "#7C6FFF";
const LAVENDER = "#C5BAFF";
const WHITE = "#FFFFFF";

const s = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flex: 1, backgroundColor: BG },
  scrollContent: { flexGrow: 1 },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    backgroundColor: INK,
    overflow: "hidden",
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(28, 27, 46, 0.55)",
  },

  // Decorative blobs
  blobTL: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: PRIMARY,
    opacity: 0.18,
  },
  blobBR: {
    position: "absolute",
    bottom: -30,
    right: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: LAVENDER,
    opacity: 0.2,
  },

  // Logo sits at the bottom of the hero, half-overlapping the card
  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
    // Pull it down so it overlaps the card below
    marginBottom: -50,
    zIndex: 10,
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },

  // ── Card ──────────────────────────────────────────────────────────────────
  card: {
    flex: 1,
    backgroundColor: WHITE,
    marginHorizontal: 20,
    marginTop: 30, // leaves space for the overlapping logo
    marginBottom: 32,
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 60, // clear space below the logo
    paddingBottom: 32,
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
});
