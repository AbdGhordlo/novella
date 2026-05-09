import { CustomButtonProps } from "@/type";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[s.btn, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={isLoading}
    >
      {leftIcon && <View style={s.leftIcon}>{leftIcon}</View>}
      <View style={s.row}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={[s.text, textStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  btn: {
    backgroundColor: "#7C6FFF",
    borderRadius: 18,
    paddingVertical: 17,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    // Purple glow
    shadowColor: "#7C6FFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  leftIcon: {
    marginRight: 2,
  },
});
