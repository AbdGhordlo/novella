import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const PRIMARY = "#7C6FFF";
const INACTIVE = "#B0AECF";
const WHITE = "#FFFFFF";
const LAVENDER = "#C5BAFF";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View style={[ts.iconWrap, focused && ts.iconWrapActive]}>
    <Image
      source={icon}
      style={ts.iconImg}
      resizeMode="contain"
      tintColor={focused ? PRIMARY : INACTIVE}
    />
    <Text
      style={[ts.iconLabel, focused && ts.iconLabelActive]}
      numberOfLines={1}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={images.bag} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              icon={images.person}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const ts = StyleSheet.create({
  iconWrap: {
    minWidth: 70,
    minHeight: "150%",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 36,
    borderRadius: 24,
    paddingVertical: 20,
  },

  iconImg: {
    width: 28,
    height: 28,
  },

  iconLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: INACTIVE,
    includeFontPadding: false,
  },

  iconLabelActive: {
    color: PRIMARY,
  },
});
