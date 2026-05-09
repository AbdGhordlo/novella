import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { useCartStore } from "@/store/cart.store";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Payment row ─────────────────────────────────────────────────────────────

function PaymentRow({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <View style={s.payRow}>
      <Text style={[s.payLabel, bold && s.payBold]}>{label}</Text>
      <Text style={[s.payValue, bold && s.payBold, accent && s.payAccent]}>
        {value}
      </Text>
    </View>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyCart() {
  return (
    <View style={s.emptyWrap}>
      <Text style={s.emptyEmoji}>🛒</Text>
      <Text style={s.emptyTitle}>Your cart is empty</Text>
      <Text style={s.emptySubtitle}>Add some books to get started!</Text>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const delivery = 5.0;
  const discount = 0.5;
  const grandTotal = totalPrice + delivery - discount;

  return (
    <SafeAreaView style={s.screen}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={s.cartItemWrap}>
            <CartItem item={item} />
          </View>
        )}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={s.headerWrap}>
            <CustomHeader title="Your Cart" />
            {totalItems > 0 && (
              <View style={s.countBadge}>
                <Text style={s.countBadgeText}>
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </Text>
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<EmptyCart />}
        ListFooterComponent={() =>
          totalItems > 0 ? (
            <View style={s.footer}>
              {/* ── Divider ── */}
              <View style={s.divider} />

              {/* ── Order summary card ── */}
              <View style={s.summaryCard}>
                {/* Header stripe */}
                <View style={s.summaryStripe}>
                  <Text style={s.summaryStripeText}>📋 Order Summary</Text>
                </View>

                <View style={s.summaryBody}>
                  <PaymentRow
                    label={`Subtotal (${totalItems} item${totalItems !== 1 ? "s" : ""})`}
                    value={`$${totalPrice.toFixed(2)}`}
                  />
                  <PaymentRow
                    label="Delivery fee"
                    value={`$${delivery.toFixed(2)}`}
                  />

                  {/* Discount row */}
                  <View style={s.discountRow}>
                    <View style={s.discountBadge}>
                      <Text style={s.discountBadgeText}>PROMO APPLIED</Text>
                    </View>
                    <Text style={s.discountValue}>-${discount.toFixed(2)}</Text>
                  </View>

                  {/* Divider */}
                  <View style={s.summaryDivider} />

                  <PaymentRow
                    label="Total"
                    value={`$${grandTotal.toFixed(2)}`}
                    bold
                  />
                </View>
              </View>

              {/* ── Delivery info chip ── */}
              <View style={s.deliveryChip}>
                <Text style={s.deliveryChipText}>
                  📦 Estimated delivery: 3–5 business days
                </Text>
              </View>

              {/* ── CTA ── */}
              <View style={s.ctaWrap}>
                <CustomButton title="Place Order" />
              </View>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default Cart;

// ─── Styles ───────────────────────────────────────────────────────────────────

const BG = "#FBFBFB";
const WHITE = "#FFFFFF";
const PRIMARY = "#7C6FFF";
const INK = "#1C1B2E";
const MUTED = "#8B8BA8";
const BORDER = "#EBEBF5";
const LAVENDER = "#C5BAFF";
const PERIW = "#C4D9FF";
const SUCCESS = "#4CAF8A";

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  listContent: { paddingBottom: 120, paddingHorizontal: 20, paddingTop: 8 },

  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  countBadge: {
    backgroundColor: "#EDE9FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  countBadgeText: { color: PRIMARY, fontSize: 12, fontWeight: "700" },

  cartItemWrap: {
    backgroundColor: WHITE,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: "800", color: INK, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: MUTED },

  footer: { marginTop: 8 },
  divider: { height: 1, backgroundColor: BORDER, marginBottom: 24 },

  // Summary card
  summaryCard: {
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: WHITE,
    shadowColor: LAVENDER,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 4,
  },
  summaryStripe: {
    backgroundColor: PERIW,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  summaryStripeText: { color: INK, fontWeight: "800", fontSize: 15 },
  summaryBody: { padding: 20, gap: 4 },

  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  payLabel: { fontSize: 14, color: MUTED },
  payValue: { fontSize: 14, color: INK, fontWeight: "600" },
  payBold: { fontWeight: "800", fontSize: 16, color: INK },
  payAccent: { color: SUCCESS },

  discountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  discountBadge: {
    backgroundColor: "#EDFAF5",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountBadgeText: {
    color: SUCCESS,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  discountValue: { color: SUCCESS, fontWeight: "700", fontSize: 14 },
  summaryDivider: { height: 1, backgroundColor: BORDER, marginVertical: 10 },

  deliveryChip: {
    backgroundColor: "#E8F9FF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
    marginBottom: 16,
  },
  deliveryChipText: { color: "#3a8fb5", fontSize: 13, fontWeight: "500" },

  ctaWrap: { marginBottom: 8 },
});
