import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query ?? "");
  const [focused, setFocused] = useState(false);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query?.trim()) router.setParams({ query });
  };

  return (
    <View style={[s.wrap, focused && s.wrapFocused]}>
      <TextInput
        style={s.input}
        placeholder="Search books, authors, genres…"
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor="#C0BFCF"
        returnKeyType="search"
      />
      <TouchableOpacity
        style={s.iconBtn}
        onPress={() => router.setParams({ query })}
        activeOpacity={0.7}
      >
        <Image
          source={images.search}
          style={s.icon}
          resizeMode="contain"
          tintColor={focused ? "#7C6FFF" : "#B0AECF"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const WHITE = "#FFFFFF";
const INK = "#1C1B2E";
const BORDER = "#EBEBF5";

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: BORDER,
    paddingLeft: 18,
    // Default shadow
    shadowColor: "#C5BAFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  // Focused: border + glow turn purple
  wrapFocused: {
    borderColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: INK,
    fontWeight: "500",
  },
  iconBtn: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  icon: { width: 21, height: 21 },
});
