import seed from "@/lib/seed";
import useAuthStore from "@/store/auth.store";
import { router } from "expo-router";
import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Placeholder data ─────────────────────────────────────────────────────────

const STATS = [
  { label: "Books", value: "24", emoji: "📚" },
  { label: "Reviews", value: "12", emoji: "✍️" },
  { label: "Favourites", value: "8", emoji: "❤️" },
];

const RECENT_BOOKS = [
  { id: 1, title: "Dune", color: "#9580ff" },
  { id: 2, title: "Atomic Habits", color: "#6ca8f5" },
  { id: 3, title: "Midnight Library", color: "#f59b8a" },
];

const SETTINGS = [
  { icon: "🔔", label: "Notifications", subtitle: "Manage alerts" },
  { icon: "🌐", label: "Language", subtitle: "English" },
  { icon: "🎨", label: "Appearance", subtitle: "Light mode" },
  { icon: "🔒", label: "Privacy & Security", subtitle: "Password, data" },
  { icon: "💳", label: "Payment Methods", subtitle: "Cards & wallets" },
  { icon: "❓", label: "Help & Support", subtitle: "FAQs, contact us" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, emoji }: (typeof STATS)[0]) {
  return (
    <View style={s.statCard}>
      <Text style={s.statEmoji}>{emoji}</Text>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

function MiniBookCover({ title, color }: { title: string; color: string }) {
  return (
    <View style={[s.miniCover, { backgroundColor: color }]}>
      <View style={s.miniCoverLine} />
      <View style={[s.miniCoverLine, { width: 40, opacity: 0.3 }]} />
      <View style={s.miniCoverBottom}>
        <Text style={s.miniCoverTitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </View>
  );
}

function SettingsRow({ icon, label, subtitle }: (typeof SETTINGS)[0]) {
  return (
    <TouchableOpacity style={s.settingsRow} activeOpacity={0.7}>
      <View style={s.settingsIconWrap}>
        <Text style={s.settingsIcon}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={s.settingsLabel}>{label}</Text>
        <Text style={s.settingsSubtitle}>{subtitle}</Text>
      </View>
      <Text style={s.settingsChevron}>›</Text>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const Profile = () => {
  const { user, logout } = useAuthStore();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={s.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        {/* ── Header ── */}
        <View style={s.topBar}>
          <Text style={s.topTitle}>Profile</Text>
          <TouchableOpacity style={s.editBtn}>
            <Text style={s.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* ── Avatar card ── */}
        <View style={s.avatarCard}>
          {/* Decorative blobs */}
          <View style={s.blobTL} />
          <View style={s.blobBR} />

          <View style={s.avatarCircle}>
            <Text style={s.avatarInitials}>{initials}</Text>
          </View>
          <Text style={s.userName}>{user?.name ?? "Reader"}</Text>
          <Text style={s.userEmail}>{user?.email ?? "—"}</Text>

          <View style={s.memberBadge}>
            <Text style={s.memberBadgeText}>✦ Novella Member</Text>
          </View>
        </View>

        {/* ── Stats row ── */}
        <View style={s.statsRow}>
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </View>

        {/* ── Reading shelf ── */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>My Shelf</Text>
            <TouchableOpacity>
              <Text style={s.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingRight: 4 }}
          >
            {RECENT_BOOKS.map((b) => (
              <MiniBookCover key={b.id} title={b.title} color={b.color} />
            ))}
            {/* Add more placeholder */}
            <TouchableOpacity style={s.addBookBtn}>
              <Text style={s.addBookIcon}>＋</Text>
              <Text style={s.addBookText}>Add book</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* ── Settings ── */}
        <View style={s.section}>
          <Text style={[s.sectionTitle, { marginBottom: 8 }]}>Settings</Text>
          <View style={s.settingsCard}>
            {SETTINGS.map((item, i) => (
              <React.Fragment key={item.label}>
                <SettingsRow {...item} />
                {i < SETTINGS.length - 1 && <View style={s.rowDivider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── Sign out ── */}
        <TouchableOpacity
          style={s.signOutBtn}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={s.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={s.version}>Novella v1.0.0</Text>
        <Button
          title="Seed"
          onPress={() =>
            seed().catch((e) => console.log("Failed to seed the database.", e))
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

// ─── Styles ───────────────────────────────────────────────────────────────────

const BG = "#FBFBFB";
const WHITE = "#FFFFFF";
const PRIMARY = "#7C6FFF";
const LAVENDER = "#C5BAFF";
const PERIW = "#C4D9FF";
const LIGHT_BLU = "#E8F9FF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";
const BORDER = "#EBEBF5";

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 120, paddingHorizontal: 20 },

  // Top bar
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  topTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: INK,
    letterSpacing: -0.5,
  },
  editBtn: {
    backgroundColor: "#EDE9FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  editBtnText: { color: PRIMARY, fontWeight: "700", fontSize: 13 },

  // Avatar card
  avatarCard: {
    backgroundColor: INK,
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  blobTL: {
    position: "absolute",
    top: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: PRIMARY,
    opacity: 0.18,
  },
  blobBR: {
    position: "absolute",
    bottom: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: LAVENDER,
    opacity: 0.2,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: LAVENDER,
  },
  avatarInitials: { color: WHITE, fontSize: 28, fontWeight: "900" },
  userName: {
    color: WHITE,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userEmail: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    marginBottom: 16,
  },
  memberBadge: {
    backgroundColor: "rgba(197,186,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  memberBadgeText: {
    color: LAVENDER,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  // Stats
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  statEmoji: { fontSize: 22, marginBottom: 6 },
  statValue: {
    fontSize: 20,
    fontWeight: "900",
    color: INK,
    letterSpacing: -0.5,
  },
  statLabel: { fontSize: 11, color: MUTED, fontWeight: "600", marginTop: 2 },

  // Section
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: INK,
    letterSpacing: -0.3,
  },
  seeAll: { color: PRIMARY, fontWeight: "600", fontSize: 13 },

  // Mini book cover
  miniCover: {
    width: 100,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  miniCoverLine: {
    width: 28,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 2,
    marginBottom: 5,
    marginLeft: 12,
    marginTop: 12,
  },
  miniCoverBottom: { backgroundColor: "rgba(0,0,0,0.2)", padding: 10 },
  miniCoverTitle: {
    color: WHITE,
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 14,
  },

  addBookBtn: {
    width: 100,
    height: 140,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: BORDER,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  addBookIcon: { fontSize: 22, color: MUTED },
  addBookText: { fontSize: 11, color: MUTED, fontWeight: "600" },

  // Settings
  settingsCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  settingsIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsIcon: { fontSize: 18 },
  settingsLabel: { fontSize: 15, fontWeight: "600", color: INK },
  settingsSubtitle: { fontSize: 12, color: MUTED, marginTop: 1 },
  settingsChevron: { fontSize: 22, color: MUTED, fontWeight: "300" },
  rowDivider: { height: 1, backgroundColor: BORDER, marginLeft: 70 },

  // Sign out
  signOutBtn: {
    backgroundColor: WHITE,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#FFD6D6",
  },
  signOutText: { color: "#E05555", fontWeight: "700", fontSize: 15 },

  version: {
    textAlign: "center",
    color: "#C0BFCF",
    fontSize: 12,
    marginBottom: 8,
  },
});
