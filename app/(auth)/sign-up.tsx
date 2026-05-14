import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser, signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password)
      return Alert.alert(
        "Error",
        "Please enter a valid name, email & password.",
      );

    setIsSubmitting(true);
    try {
      await createUser({ email, password, name });
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={s.wrap}>
      {/* ── Heading ── */}
      <View style={s.headingWrap}>
        <Text style={s.title}>Create account</Text>
        <Text style={s.subtitle}>Join Novella and start reading</Text>
      </View>

      {/* ── Fields ── */}
      <View style={s.fields}>
        <CustomInput
          label="Full Name"
          placeholder="Your full name"
          value={form.name}
          onChangeText={(text) => setForm((p) => ({ ...p, name: text }))}
        />
        <CustomInput
          label="Email"
          placeholder="you@example.com"
          value={form.email}
          onChangeText={(text) => setForm((p) => ({ ...p, email: text }))}
          keyboardType="email-address"
        />
        <CustomInput
          label="Password"
          placeholder="Create a password"
          value={form.password}
          onChangeText={(text) => setForm((p) => ({ ...p, password: text }))}
          secureTextEntry
        />
      </View>

      {/* ── CTA ── */}
      <CustomButton
        title="Create Account"
        isLoading={isSubmitting}
        onPress={submit}
      />

      {/* ── Footer link ── */}
      <View style={s.footerRow}>
        <Text style={s.footerText}>Already have an account?</Text>
        <Link href="/sign-in" style={s.footerLink}>
          Sign In
        </Link>
      </View>
    </View>
  );
};

export default SignUp;

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
