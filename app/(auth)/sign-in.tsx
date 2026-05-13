import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;
    if (!email || !password)
      return Alert.alert(
        "Missing fields",
        "Please enter your email and password.",
      );

    setIsSubmitting(true);
    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Sign in failed", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={s.wrap}>
      {/* ── Heading ── */}
      <View style={s.headingWrap}>
        <Text style={s.title}>Welcome back</Text>
        <Text style={s.subtitle}>Sign in to continue reading</Text>
      </View>

      {/* ── Fields ── */}
      <View style={s.fields}>
        <CustomInput
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChangeText={(text) => setForm((p) => ({ ...p, email: text }))}
          keyboardType="email-address"
        />
        <CustomInput
          label="Password"
          placeholder="Your password"
          value={form.password}
          onChangeText={(text) => setForm((p) => ({ ...p, password: text }))}
          secureTextEntry
        />
      </View>

      {/* ── CTA ── */}
      <CustomButton title="Sign In" isLoading={isSubmitting} onPress={submit} />

      {/* ── Footer link ── */}
      <View style={s.footerRow}>
        <Text style={s.footerText}>{"Don't have an account?"}</Text>
        <Link href="/sign-up" style={s.footerLink}>
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;

// ─── Styles ───────────────────────────────────────────────────────────────────

const PRIMARY = "#7C6FFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";

const s = StyleSheet.create({
  wrap: { gap: 24 },

  headingWrap: { gap: 4, marginBottom: 4 },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: INK,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "500",
  },

  fields: { gap: 16 },

  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  footerText: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "500",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "800",
    color: PRIMARY,
  },
});
