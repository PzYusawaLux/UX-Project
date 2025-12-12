import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView as RNSafeAreaView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LOCATIONS = [
  {
    id: "1",
    name: "Centre Ave + Crawford Bus Stop",
    coordinates: { x: 65, y: 60 },
  },
  {
    id: "2",
    name: "Seventh Ave + Smithfield St",
    coordinates: { x: 35, y: 45 },
  },
  {
    id: "3",
    name: "Liberty Ave + William Penn",
    coordinates: { x: 55, y: 35 },
  },
];

const MAP_IMAGE = require("../../assets/Downtown Map.jpg");

export default function MapScreen({ navigation }: any) {
  const handleLocationPress = (location: any) => {
    if (navigation && navigation.navigate) {
      navigation.navigate("StationScreen", { station: { id: location.id } });
    }
  };

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

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
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Map</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Map Area - Placeholder */}
        <View style={styles.mapContainer}>
          <Image
            source={MAP_IMAGE}
            style={styles.mapImage}
          />

          {/* Location Markers */}
          {LOCATIONS.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.marker,
                {
                  left: `${location.coordinates.x}%`,
                  top: `${location.coordinates.y}%`,
                },
              ]}
              onPress={() => handleLocationPress(location)}
              activeOpacity={0.7}
            >
              <View style={styles.markerInner}>
                <Text style={styles.markerText}>📍</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
            style={[styles.navTab, styles.navTabActive]}
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
  mapContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  marker: {
    position: "absolute",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -22 }, { translateY: -22 }],
  },
  markerInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#0B1B7A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E83B66",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 24,
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

