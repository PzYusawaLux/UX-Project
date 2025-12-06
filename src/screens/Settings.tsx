import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings({ navigation }: any) {
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
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.settingList}>
            <TouchableOpacity 
              style={styles.settingItem} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate("General")}
            >
              <Text style={styles.settingLabel}>General</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.settingItem} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.settingItem} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Help")}
            >
              <Text style={styles.settingLabel}>Help</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navTab, styles.navTabActive]}
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
  settingList: {
    gap: 8,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
  settingArrow: {
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
  navTabActive: {
    backgroundColor: "#0B1B7A",
  },
  navIcon: {
    fontSize: 20,
  },
});
