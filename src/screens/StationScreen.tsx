import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATION_DATA = {
  name: "Centre Ave + Crawford Bus Stop",
  address: "Centre Ave + Crawford, 15219, Pittsburgh",
  lines: [
    {
      id: "82",
      name: "82",
      destination: "Craig St",
      color: "#4CAF50",
    },
    {
      id: "83",
      name: "83",
      destination: "Liberty Ave",
      color: "#E83B66",
    },
    {
      id: "101",
      name: "101",
      destination: "Downtown Station",
      color: "#2196F3",
    },
  ],
};

export default function StationScreen({ navigation, route }: any) {
  const stationParam = route?.params?.station;
  const station = stationParam?.lines ? stationParam : STATION_DATA;

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Station Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Station Info */}
          <View style={styles.stationInfo}>
            <Text style={styles.stationName}>{station.name}</Text>
            <View style={styles.addressContainer}>
              <Text style={styles.addressIcon}>📍</Text>
              <Text style={styles.address}>{station.address}</Text>
            </View>
          </View>

          {/* Departure Board */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Departure board</Text>
            <Text style={styles.departureTime}>14:05</Text>

            {/* Lines at 14:05 */}
            <View style={styles.timeSlot}>
              {station.lines.slice(0, 2).map((line: any) => (
                <View
                  key={line.id}
                  style={[styles.lineBadge, { backgroundColor: line.color }]}
                >
                  <Text style={styles.lineBadgeText}>{line.id}</Text>
                </View>
              ))}
              <View style={styles.alertIcon}>
                <Text>⚠️</Text>
              </View>
            </View>

            {/* Lines at 14:10 */}
            <Text style={[styles.departureTime, { marginTop: 16 }]}>
              14:10
            </Text>
            <View style={styles.timeSlot}>
              {station.lines.map((line: any) => (
                <View
                  key={line.id}
                  style={[styles.lineBadge, { backgroundColor: line.color }]}
                >
                  <Text style={styles.lineBadgeText}>{line.id}</Text>
                </View>
              ))}
              <View style={styles.alertIcon}>
                <Text>🔔</Text>
              </View>
            </View>

            {/* Lines at 14:08 */}
            <Text style={[styles.departureTime, { marginTop: 16 }]}>
              14:08
            </Text>
            <View style={styles.timeSlot}>
              {station.lines.slice(1).map((line: any) => (
                <View
                  key={line.id}
                  style={[styles.lineBadge, { backgroundColor: line.color }]}
                >
                  <Text style={styles.lineBadgeText}>{line.id}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Text style={styles.navIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navTab, styles.navTabActive]}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Text style={styles.navIcon}>🎫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
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
  backIcon: {
    fontSize: 24,
    color: "#111",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  stationInfo: {
    marginBottom: 24,
  },
  stationName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addressIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  address: {
    fontSize: 13,
    color: "#666",
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  departureTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  lineBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  lineBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  alertIcon: {
    fontSize: 18,
    marginLeft: 8,
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

