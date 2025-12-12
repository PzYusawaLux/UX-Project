import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Support({ navigation }: any) {
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
          <Text style={styles.headerTitle}>Support</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Us</Text>
            <TouchableOpacity style={styles.supportItem} activeOpacity={0.7}>
              <Text style={styles.itemIcon}>📧</Text>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Email Support</Text>
                <Text style={styles.itemDesc}>support@transit.app</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem} activeOpacity={0.7}>
              <Text style={styles.itemIcon}>📞</Text>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Phone Support</Text>
                <Text style={styles.itemDesc}>1-800-TRANSIT</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.supportItem} activeOpacity={0.7}>
              <Text style={styles.itemIcon}>💬</Text>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>Live Chat</Text>
                <Text style={styles.itemDesc}>Available 24/7</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQ</Text>
            <TouchableOpacity style={styles.faqItem} activeOpacity={0.7}>
              <Text style={styles.faqQuestion}>How do I buy a ticket?</Text>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem} activeOpacity={0.7}>
              <Text style={styles.faqQuestion}>Can I refund my ticket?</Text>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem} activeOpacity={0.7}>
              <Text style={styles.faqQuestion}>How to update my profile?</Text>
              <Text style={styles.faqArrow}>›</Text>
            </TouchableOpacity>
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
            style={styles.navTab}
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
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 13,
    color: "#999",
  },
  faqItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
    flex: 1,
  },
  faqArrow: {
    fontSize: 18,
    color: "#999",
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
  navIcon: {
    fontSize: 20,
  },
});
