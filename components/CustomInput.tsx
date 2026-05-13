import { CustomInputProps } from "@/type";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={s.wrap}>
      {label && <Text style={s.label}>{label}</Text>}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER}
        style={[s.input, isFocused ? s.inputFocused : s.inputBlurred]}
      />
    </View>
  );
};

export default CustomInput;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";
const BORDER = "#E2DFF5";
const BG = "#F7F6FF";
const PLACEHOLDER = "#B0AECF";

const s = StyleSheet.create({
  wrap: { width: "100%", gap: 7 },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: INK,
    letterSpacing: 0.1,
  },

  input: {
    backgroundColor: BG,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: INK,
    borderWidth: 1.5,
  },

  inputBlurred: {
    borderColor: BORDER,
  },

  inputFocused: {
    borderColor: PRIMARY,
    // Soft purple glow when active
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
});
