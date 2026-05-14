import BookCard from "@/components/BookCard";
import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { getBooks, getCategories } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Book } from "@/type";
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

  const {
    data: books,
    refetch,
    loading,
  } = useAppwrite({
    fn: getBooks,
    params: { category, query, limit: 20 },
  });

  useEffect(() => {
    refetch({ category, query, limit: 20 });
  }, [category, query]);

  const { data: categories } = useAppwrite({ fn: getCategories });
  const activeCategory = categories?.find((c) => c.$id === category);

  return (
    <SafeAreaView style={s.screen}>
      <FlatList
        data={books as Book[]}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={s.columnWrapper}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={s.cardWrap}>
            <BookCard item={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={s.header}>
            <View style={s.titleRow}>
              <View>
                <Text style={s.eyebrow}>DISCOVER</Text>
                <Text style={s.title}>Find your{"\n"}next read</Text>
              </View>
              <CartButton />
            </View>
            <View style={s.searchWrap}>
              <SearchBar />
            </View>
            {(query || activeCategory) && (
              <View style={s.contextBanner}>
                <Text style={s.contextText}>
                  {query
                    ? `Results for "${query}"`
                    : `Browsing "${activeCategory?.name}"`}
                </Text>
              </View>
            )}
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

const BG = "#FBFBFB";
const PRIMARY = "#7C6FFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";
const BORDER = "#EBEBF5";
const LAVENDER = "#C5BAFF";

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  listContent: { paddingBottom: 120, paddingHorizontal: 20 },
  columnWrapper: { gap: 14, marginBottom: 14 },
  cardWrap: { flex: 1 },
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
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
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
