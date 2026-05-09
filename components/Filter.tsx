import { Category } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState<string>(
    (searchParams.category as string) || "all",
  );

  const handlePress = (id: string) => {
    setActive(id);
    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData: { $id: string; name: string }[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.row}
      renderItem={({ item }) => {
        const isActive = active === item.$id;
        return (
          <TouchableOpacity
            style={[
              s.pill,
              isActive && s.pillActive,
              Platform.OS === "android" && {
                elevation: isActive ? 0 : 3,
                shadowColor: "#C5BAFF",
              },
            ]}
            onPress={() => handlePress(item.$id)}
            activeOpacity={0.75}
          >
            <Text style={[s.pillText, isActive && s.pillTextActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Filter;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const WHITE = "#FFFFFF";
const MUTED = "#8B8BA8";
const BORDER = "#EBEBF5";

const s = StyleSheet.create({
  row: {
    gap: 8,
    paddingBottom: 4,
    paddingRight: 4,
  },
  pill: {
    backgroundColor: WHITE,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: BORDER,
    // iOS shadow
    shadowColor: "#C5BAFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  pillActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
    shadowOpacity: 0,
  },
  pillText: {
    color: MUTED,
    fontWeight: "600",
    fontSize: 13,
  },
  pillTextActive: {
    color: WHITE,
  },
});
