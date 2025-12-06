import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment({ navigation }: any) {
  const handleNavTab = (screen: string) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(screen);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payment Methods</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity style={styles.paymentItem} activeOpacity={0.7}>
              <View style={styles.paymentIcon}>
                <Text>💳</Text>
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentMethod}>Visa Card</Text>
                <Text style={styles.paymentInfo}>**** **** **** 1234</Text>
              </View>
              <Text style={styles.checkmark}>✓</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentItem} activeOpacity={0.7}>
              <View style={styles.paymentIcon}>
                <Text>📱</Text>
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentMethod}>Apple Pay</Text>
                <Text style={styles.paymentInfo}>Not connected</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentItem} activeOpacity={0.7}>
              <View style={styles.paymentIcon}>
                <Text>🏦</Text>
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentMethod}>Bank Transfer</Text>
                <Text style={styles.paymentInfo}>Not connected</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>+ Add Payment Method</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>Bus Ticket</Text>
                <Text style={styles.transactionDate}>Dec 5, 2025</Text>
              </View>
              <Text style={styles.transactionAmount}>-$14.90</Text>
            </View>
            <View style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>Monthly Pass</Text>
                <Text style={styles.transactionDate}>Dec 1, 2025</Text>
              </View>
              <Text style={styles.transactionAmount}>-$85.00</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => handleNavTab("Settings")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => handleNavTab("MapScreen")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => handleNavTab("Home")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => handleNavTab("TicketDetails")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>🎫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navTab, styles.navTabActive]}
            onPress={() => handleNavTab("Payment")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>💳</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  paymentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 8,
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentDetails: {
    flex: 1,
  },
  paymentMethod: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  paymentInfo: {
    fontSize: 13,
    color: "#999",
  },
  checkmark: {
    fontSize: 16,
    color: "#4CAF50",
  },
  arrow: {
    fontSize: 18,
    color: "#999",
  },
  addButton: {
    backgroundColor: "#E83B66",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E83B66",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  navTab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  navTabActive: {
    backgroundColor: "#0B1B7A",
  },
  navIcon: {
    fontSize: 20,
  },
});
