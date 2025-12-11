import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ROUTE_DATA = {
  id: "1",
  startLocation: "Cityview Apartment",
  startAddress: "1420 Centre Ave., 15219, Pittsburgh",
  startDistance: "105 ft",
  price: 14.9,
  status: "unpaid",
  stops: [
    {
      id: "1",
      type: "start",
      location: "Cityview Apartment",
      address: "1420 Centre Ave., 15219, Pittsburgh",
      distance: "105 ft",
      icon: "🚶",
    },
    {
      id: "2",
      type: "transit",
      lineId: "82",
      lineName: "B2",
      location: "Centre Ave + Crawford",
      address: "Centre Ave + Crawford, 15219, Pittsburgh",
      distance: "5.3 mi",
      color: "#4CAF50",
      icon: "🚌",
      status: "on-time",
    },
    {
      id: "3",
      type: "transit",
      lineId: "71A",
      lineName: "71A",
      location: "Centre Ave + Craig St",
      address: "Centre Ave + Craig St, 15213, Pittsburgh",
      distance: "1.3 mi",
      color: "#9C27B0",
      icon: "🚌",
      status: "on-time",
    },
  ],
};

export default function YourRoute({ navigation, route }: any) {
  const [routeData, setRouteData] = useState(ROUTE_DATA);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleBuyTickets = async () => {
    try {
      // Save purchase status
      await AsyncStorage.setItem("ticketPurchased", "true");
      // Navigate to TicketDetails
      if (navigation && navigation.navigate) {
        navigation.navigate("TicketDetails", { route: routeData });
      }
    } catch (error) {
      console.log("Error saving purchase status:", error);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    // Navigate back to Home
    if (navigation && navigation.navigate) {
      navigation.navigate("Home");
    }
  };

  const handleMapRoute = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("RouteSimulation", { route: routeData });
    }
  };

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
          <Text style={styles.headerTitle}>Your route</Text>
          <TouchableOpacity onPress={handleCancelClick} activeOpacity={0.7}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Price Card */}
          <View style={styles.priceCard}>
            <Text style={styles.price}>${routeData.price}</Text>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={handleBuyTickets}
              activeOpacity={0.8}
            >
              <Text style={styles.buyButtonText}>Buy Tickets</Text>
            </TouchableOpacity>
          </View>

          {/* Route Stops */}
          {routeData.stops.map((stop, index) => (
            <View key={stop.id}>
              {/* Line Separator (not for first stop) */}
              {index > 0 && (
                <View style={styles.lineSeparator}>
                  <View style={styles.verticalLine} />
                </View>
              )}

              {/* Stop Item */}
              <View style={styles.locationSection}>
                <View
                  style={[
                    styles.locationIcon,
                    stop.type === "transit" && {
                      backgroundColor: stop.color,
                    },
                  ]}
                >
                  <Text style={styles.iconText}>{stop.icon}</Text>
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.distanceLabel}>{stop.distance}</Text>
                  <Text style={styles.locationName}>{stop.location}</Text>
                  <Text style={styles.locationAddress}>
                    {stop.address}
                  </Text>
                  {stop.type === "transit" && (
                    <View style={styles.lineTag}>
                      <Text style={[styles.lineTagText, { backgroundColor: stop.color }]}>
                        {stop.lineName}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}

          {/* Route on Map Button */}
          <TouchableOpacity
            style={styles.mapButton}
            onPress={handleMapRoute}
            activeOpacity={0.8}
          >
            <Text style={styles.mapButtonText}>Route on map</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              if (navigation && navigation.navigate) {
                navigation.navigate("Settings");
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              if (navigation && navigation.navigate) {
                navigation.navigate("MapScreen");
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              if (navigation && navigation.navigate) {
                navigation.navigate("Home");
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Text style={styles.navIcon}>🎫</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => {
              if (navigation && navigation.navigate) {
                navigation.navigate("Payment");
              }
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.navIcon}>💳</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cancel Confirmation Modal */}
      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCancelModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Cancel tour?</Text>

            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleConfirmCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.modalConfirmButtonText}>
                Yes, go to home page
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalDeclineButton}
              onPress={() => setShowCancelModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.modalDeclineButtonText}>No, stay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  cancelButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E83B66",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  priceCard: {
    backgroundColor: "#0B1B7A",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  price: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    elevation: 2,
    shadowColor: "#E83B66",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  locationSection: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 4,
  },
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 2,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  iconText: {
    fontSize: 22,
  },
  locationDetails: {
    flex: 1,
    justifyContent: "center",
  },
  distanceLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
    fontWeight: "500",
  },
  locationName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  lineTag: {
    marginTop: 8,
    flexDirection: "row",
  },
  lineTagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lineSeparator: {
    flexDirection: "row",
    marginLeft: 32,
    marginVertical: 6,
  },
  verticalLine: {
    width: 2,
    height: 20,
    backgroundColor: "#E8E8E8",
  },
  transitSection: {
    flexDirection: "row",
    marginBottom: 18,
    paddingVertical: 2,
  },
  transitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  transitIconText: {
    fontSize: 22,
  },
  transitDetails: {
    flex: 1,
    justifyContent: "center",
  },
  lineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  lineName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginRight: 8,
  },
  lineStatus: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  transitName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 2,
  },
  transitAddress: {
    fontSize: 12,
    color: "#999",
  },
  endLocationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E83B66",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    elevation: 2,
    shadowColor: "#E83B66",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  endIconText: {
    fontSize: 22,
  },
  mapButton: {
    backgroundColor: "#E83B66",
    borderRadius: 20,
    paddingVertical: 16,
    marginVertical: 28,
    marginBottom: 40,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#E83B66",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  mapButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
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
  navIcon: {
    fontSize: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalCloseButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  modalCloseIcon: {
    fontSize: 20,
    color: "#999",
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 24,
    textAlign: "center",
  },
  modalConfirmButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  modalConfirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  modalDeclineButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
  },
  modalDeclineButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});
