import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RouteSimulation({ navigation, route }: any) {
  const { width, height } = useWindowDimensions();

  const routeData = useMemo(() => ({
    start: {
      id: "1",
      name: "Cityview Apartment",
      address: "1420 Centre Ave., 15219, Pittsburgh",
      distance: "105 ft",
      x: width * 0.12,
      y: height * 0.75,
    },
    waypoints: [
      {
        id: "2",
        name: "Centre Ave + Crawford",
        address: "Centre Ave + Crawford, 15219, Pittsburgh",
        distance: "5.3 mi",
        line: "B2",
        x: width * 0.22,
        y: height * 0.55,
        color: "#4CAF50",
      },
    ],
    end: {
      id: "3",
      name: "Centre Ave + Craig St",
      address: "Centre Ave + Craig St, 15213, Pittsburgh",
      distance: "1.3 mi",
      line: "71A",
      x: width * 0.70,
      y: height * 0.25,
      color: "#9C27B0",
    },
  }), [width, height]);

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

        {/* Map Container */}
        <View style={styles.mapContainer}>
          {/* Background Map Image */}
          <Image
            source={require("../../assets/PittsburghRoute.png")}
            style={styles.mapImage}
            resizeMode="cover"
          />

          {/* Connection Lines - Line 1 */}
          <View
            style={{
              position: "absolute",
              left: routeData.start.x,
              top: routeData.start.y,
              width: Math.sqrt(
                Math.pow(routeData.waypoints[0].x - routeData.start.x, 2) +
                Math.pow(routeData.waypoints[0].y - routeData.start.y, 2)
              ),
              height: 2,
              backgroundColor: "#9C27B0",
              opacity: 0.6,
              transform: [
                {
                  rotate:
                    Math.atan2(
                      routeData.waypoints[0].y - routeData.start.y,
                      routeData.waypoints[0].x - routeData.start.x
                    ) +
                    "rad",
                },
              ],
              transformOrigin: "0 0",
            }}
          />

          {/* Connection Lines - Line 2 */}
          <View
            style={{
              position: "absolute",
              left: routeData.waypoints[0].x,
              top: routeData.waypoints[0].y,
              width: Math.sqrt(
                Math.pow(routeData.end.x - routeData.waypoints[0].x, 2) +
                Math.pow(routeData.end.y - routeData.waypoints[0].y, 2)
              ),
              height: 2,
              backgroundColor: "#9C27B0",
              opacity: 0.6,
              transform: [
                {
                  rotate:
                    Math.atan2(
                      routeData.end.y - routeData.waypoints[0].y,
                      routeData.end.x - routeData.waypoints[0].x
                    ) +
                    "rad",
                },
              ],
              transformOrigin: "0 0",
            }}
          />

          {/* Start Marker */}
          <View
            style={[
              styles.marker,
              styles.startMarker,
              {
                left: routeData.start.x - 22,
                top: routeData.start.y - 22,
              },
            ]}
          >
            <Text style={styles.markerIcon}>📍</Text>
          </View>

          {/* Waypoint Markers */}
          {routeData.waypoints && Array.isArray(routeData.waypoints) && routeData.waypoints.map((waypoint: any) => (
            <View
              key={waypoint.id}
              style={[
                styles.marker,
                styles.waypointMarker,
                {
                  left: waypoint.x - 22,
                  top: waypoint.y - 22,
                  borderColor: waypoint.color,
                },
              ]}
            >
              <Text style={styles.markerIcon}>🚌</Text>
            </View>
          ))}

          {/* End Marker */}
          <View
            style={[
              styles.marker,
              styles.endMarker,
              {
                left: routeData.end.x - 22,
                top: routeData.end.y - 22,
              },
            ]}
          >
            <Text style={styles.markerIcon}>▲</Text>
          </View>
        </View>

        {/* Route Information Panel */}
        <ScrollView style={styles.infoPanel} showsVerticalScrollIndicator={false}>
          <View style={styles.infoPanelContent}>
            {/* Start Stop */}
            <View style={styles.stopInfo}>
              <View style={styles.stopDot} />
              <View style={styles.stopTextContainer}>
                <Text style={styles.stopTitle}>Start</Text>
                <Text style={styles.stopName}>{routeData.start.name}</Text>
                <Text style={styles.stopAddress}>{routeData.start.distance}</Text>
              </View>
            </View>

            {/* Waypoint Stops */}
            {routeData.waypoints && Array.isArray(routeData.waypoints) && routeData.waypoints.map((waypoint: any) => (
              <View key={waypoint.id} style={styles.stopInfo}>
                <View
                  style={[styles.stopDot, { backgroundColor: waypoint.color }]}
                />
                <View style={styles.stopTextContainer}>
                  <View style={styles.lineTagContainer}>
                    <Text
                      style={[
                        styles.lineTag,
                        { backgroundColor: waypoint.color },
                      ]}
                    >
                      {waypoint.line}
                    </Text>
                  </View>
                  <Text style={styles.stopName}>{waypoint.name}</Text>
                  <Text style={styles.stopAddress}>{waypoint.distance}</Text>
                </View>
              </View>
            ))}

            {/* End Stop */}
            <View style={styles.stopInfo}>
              <View
                style={[
                  styles.stopDot,
                  { backgroundColor: routeData.end.color },
                ]}
              />
              <View style={styles.stopTextContainer}>
                <View style={styles.lineTagContainer}>
                  <Text
                    style={[
                      styles.lineTag,
                      { backgroundColor: routeData.end.color },
                    ]}
                  >
                    {routeData.end.line}
                  </Text>
                </View>
                <Text style={styles.stopName}>{routeData.end.name}</Text>
                <Text style={styles.stopAddress}>{routeData.end.distance}</Text>
              </View>
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
            style={[styles.navTab, styles.navTabActive]}
            onPress={() => handleNavTab("RouteSimulation")}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>▲</Text>
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
  safe: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  backIcon: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0B1B7A",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },
  placeholder: {
    width: 24,
  },
  mapContainer: {
    flex: 1.2,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  marker: {
    position: "absolute" as const,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  startMarker: {
    backgroundColor: "#E83B66",
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#E83B66",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  waypointMarker: {
    backgroundColor: "#fff",
    borderWidth: 3,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  endMarker: {
    backgroundColor: "#0B1B7A",
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 5,
    shadowColor: "#0B1B7A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  markerIcon: {
    fontSize: 20,
  },
  infoPanel: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 0.8,
  },
  infoPanelContent: {
    flexDirection: "column",
  },
  stopInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E83B66",
    marginRight: 12,
    marginTop: 4,
  },
  stopTextContainer: {
    flex: 1,
  },
  stopTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#999",
    marginBottom: 2,
  },
  stopName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111",
    marginBottom: 2,
  },
  stopAddress: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
  },
  lineTagContainer: {
    marginBottom: 4,
  },
  lineTag: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
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
