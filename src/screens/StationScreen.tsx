import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATION_DATA = {
  name: "Centre Ave + Crawford Bus Stop",
  address: "Centre Ave + Crawford, 15219, Pittsburgh",
  image: "crawford-stop",
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

const STATION_IMAGES: any = {
  "crawford-stop": require("../../assets/Crawford Stop.jpg"),
  "smithfield-st": require("../../assets/Smithfield.jpg"),
  "william-penn": require("../../assets/Liberty Avenue.jpg"),
  "carnegie-museum": require("../../assets/Carnegie Museum.jpg"),
  "phipps-conservatory": require("../../assets/Phipps Conservatory.jpg"),
};

const ALL_STATIONS: any = {
  "1": {
    id: "1",
    name: "Centre Ave + Crawford Bus Stop",
    address: "Centre Ave + Crawford, 15219, Pittsburgh",
    image: "crawford-stop",
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
  },
  "2": {
    id: "2",
    name: "Seventh Ave + Smithfield St",
    address: "Seventh Ave + Smithfield St, 15219, Pittsburgh",
    image: "smithfield-st",
    lines: [
      {
        id: "71",
        name: "71",
        destination: "North Hills",
        color: "#9C27B0",
      },
      {
        id: "61C",
        name: "61C",
        destination: "Penn Circle",
        color: "#FF9800",
      },
      {
        id: "P1",
        name: "P1",
        destination: "Airport",
        color: "#00BCD4",
      },
    ],
  },
  "3": {
    id: "3",
    name: "Liberty Ave + William Penn",
    address: "Liberty Ave + William Penn, 15219, Pittsburgh",
    image: "william-penn",
    lines: [
      {
        id: "1",
        name: "1",
        destination: "North Shore",
        color: "#4CAF50",
      },
      {
        id: "2",
        name: "2",
        destination: "South Hills",
        color: "#E83B66",
      },
      {
        id: "J2",
        name: "J2",
        destination: "Oakland",
        color: "#2196F3",
      },
    ],
  },
  "4": {
    id: "4",
    name: "Carnegie Museum of Art",
    address: "4400 Forbes Ave, Pittsburgh, PA 15213",
    image: "carnegie-museum",
    lines: [
      {
        id: "56",
        name: "56",
        destination: "Downtown",
        color: "#4CAF50",
      },
      {
        id: "71",
        name: "71",
        destination: "North Hills",
        color: "#9C27B0",
      },
      {
        id: "P7",
        name: "P7",
        destination: "Airport",
        color: "#FF9800",
      },
    ],
  },
  "5": {
    id: "5",
    name: "Phipps Conservatory",
    address: "1 Schenley Park, Pittsburgh, PA 15213",
    image: "phipps-conservatory",
    lines: [
      {
        id: "40",
        name: "40",
        destination: "South Hills",
        color: "#E83B66",
      },
      {
        id: "67",
        name: "67",
        destination: "East End",
        color: "#2196F3",
      },
      {
        id: "68",
        name: "68",
        destination: "Shadyside",
        color: "#00BCD4",
      },
    ],
  },
};

export default function StationScreen({ navigation, route }: any) {
  const stationParam = route?.params?.station;
  // Ensure stationId is always a string for object key lookup
  const stationId = String(stationParam?.id ?? "1");
  const station = ALL_STATIONS[stationId] || ALL_STATIONS["1"] || STATION_DATA;

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
          {/* Station Image */}
          <View style={styles.imageContainer}>
            <Image
              source={STATION_IMAGES[station.image]}
              style={styles.stationImage}
            />
          </View>

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
              <View style={styles.delayAlert}>
                <Text style={styles.delayAlertText}>LATE</Text>
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
              <View style={styles.onTimeAlert}>
                <Text style={styles.onTimeAlertText}>✓</Text>
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
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#E0E0E0",
    marginBottom: 20,
  },
  stationImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  stationInfo: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 20,
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
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#888",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  departureTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 10,
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  lineBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lineBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
  },
  alertIcon: {
    fontSize: 18,
    marginLeft: 4,
  },
  delayAlert: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#D32F2F",
    borderRadius: 4,
    marginLeft: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#D32F2F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  delayAlertText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  onTimeAlert: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
    elevation: 2,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  onTimeAlertText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 14,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#fff",
  },
  navTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F5",
  },
  navTabActive: {
    backgroundColor: "#0B1B7A",
  },
  navIcon: {
    fontSize: 22,
  },
});

