import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  const { data: categories } = useAppwrite({ fn: getCategories });

  const activeCategory = categories?.find((item) => item.$id === category);

  return (
    <SafeAreaView style={s.screen}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={s.columnWrapper}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // Equal-width cells, no odd/even offset
          <View style={s.cardWrap}>
            <MenuCard item={item as MenuItem} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={s.header}>
            {/* ── Title row ── */}
            <View style={s.titleRow}>
              <View>
                <Text style={s.eyebrow}>DISCOVER</Text>
                <Text style={s.title}>Find your{"\n"}next read</Text>
              </View>
              <CartButton />
            </View>

            {/* ── Search bar ── */}
            <View style={s.searchWrap}>
              <SearchBar />
            </View>

            {/* ── Active search context banner ── */}
            {(query || category) && (
              <View style={s.contextBanner}>
                <Text style={s.contextText}>
                  {query
                    ? `Results for "${query}"`
                    : `Browsing "${activeCategory?.name}"`}
                </Text>
              </View>
            )}

            {/* ── Filters ── */}
            <Filter categories={categories!} />

            <View style={s.divider} />
          </View>
        )}
        ListEmptyComponent={() =>
          loading ? (
            <View style={s.centered}>
              <ActivityIndicator size="large" color="#7C6FFF" />
              <Text style={s.loadingText}>Finding books…</Text>
            </View>
          ) : (
            <View style={s.centered}>
              <Text style={s.emptyEmoji}>📚</Text>
              <Text style={s.emptyTitle}>No books found</Text>
              <Text style={s.emptySubtitle}>
                Try a different search or category
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;

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
  listContent: { paddingBottom: 120, paddingHorizontal: 20 },

  // Grid — flat, no stagger
  columnWrapper: { gap: 14, marginBottom: 14 },
  cardWrap: { width: "48%" },

  // Header
  header: { marginTop: 8, marginBottom: 8 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    color: PRIMARY,
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: INK,
    lineHeight: 35,
    letterSpacing: -0.5,
  },

  searchWrap: {
    marginBottom: 14,
  },

  contextBanner: {
    backgroundColor: "#EDE9FF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 14,
    alignSelf: "flex-start",
  },
  contextText: { color: PRIMARY, fontSize: 13, fontWeight: "600" },

  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginTop: 8,
    marginBottom: 20,
  },

  // Empty / loading states
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  loadingText: { color: MUTED, marginTop: 12, fontSize: 14 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: "800", color: INK, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: MUTED, textAlign: "center" },
});
