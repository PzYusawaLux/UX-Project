import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function General({ navigation }: any) {
  const [locationAccess, setLocationAccess] = React.useState(true);
  const [autoNightMode, setAutoNightMode] = React.useState(true);
  const [autoUpdate, setAutoUpdate] = React.useState(false);

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
          <TouchableOpacity 
            onPress={() => navigation.navigate("Settings")}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>General</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>English</Text>
            </View>
          </View>

          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Location Access</Text>
              <Switch
                value={locationAccess}
                onValueChange={setLocationAccess}
                trackColor={{ false: "#E0E0E0", true: "#E83B66" }}
                thumbColor={locationAccess ? "#E83B66" : "#fff"}
              />
            </View>
          </View>

          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Night Mode</Text>
              <Switch
                value={autoNightMode}
                onValueChange={setAutoNightMode}
                trackColor={{ false: "#E0E0E0", true: "#E83B66" }}
                thumbColor={autoNightMode ? "#E83B66" : "#fff"}
              />
            </View>
          </View>

          <View style={styles.settingGroup}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto update</Text>
              <Switch
                value={autoUpdate}
                onValueChange={setAutoUpdate}
                trackColor={{ false: "#E0E0E0", true: "#E83B66" }}
                thumbColor={autoUpdate ? "#E83B66" : "#fff"}
              />
            </View>
          </View>

          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>v 15.0.89836.34</Text>
          </View>

          <TouchableOpacity style={styles.updateButton} activeOpacity={0.7}>
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    color: "#0B1B7A",
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    flex: 1,
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  settingGroup: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111",
  },
  settingValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  versionInfo: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#999",
  },
  updateButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 20,
  },
  updateButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
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
