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

const ROUTE_DATA = {
  id: "1",
  startLocation: "Cityview Apartment",
  startAddress: "1420 Centre Ave., 15219, Pittsburgh",
  startDistance: "105 ft",
  endLocation: "Centre Ave + Crawford",
  endAddress: "Centre Ave + Crawford, 15219, Pittsburgh",
  endDistance: "5.3 mi",
  price: 14.9,
  status: "unpaid",
  lines: [
    {
      id: "82",
      name: "Centre Ave + Crawford",
      distance: "5.3 mi",
      status: "on-time",
      color: "#4CAF50",
    },
    {
      id: "71A",
      name: "Centre Ave + Craig St",
      distance: "1.3 mi",
      status: "on-time",
      color: "#9C27B0",
    },
  ],
};

export default function YourRoute({ navigation, route }: any) {
  const [routeData, setRouteData] = useState(ROUTE_DATA);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleBuyTickets = () => {
    // Navigate to TicketDetails with payment flow
    if (navigation && navigation.navigate) {
      navigation.navigate("TicketDetails", { route: routeData });
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
      navigation.navigate("MapScreen");
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

          {/* Start Location */}
          <View style={styles.locationSection}>
            <View style={styles.locationIcon}>
              <Text style={styles.iconText}>🚶</Text>
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.distanceLabel}>{routeData.startDistance}</Text>
              <Text style={styles.locationName}>{routeData.startLocation}</Text>
              <Text style={styles.locationAddress}>
                {routeData.startAddress}
              </Text>
            </View>
          </View>

          {/* Route Lines */}
          {routeData.lines.map((line, index) => (
            <View key={line.id}>
              {/* Line Separator */}
              <View style={styles.lineSeparator}>
                <View style={styles.verticalLine} />
              </View>

              {/* Transit Line */}
              <View style={styles.transitSection}>
                <View
                  style={[
                    styles.transitIcon,
                    { backgroundColor: line.color },
                  ]}
                >
                  <Text style={styles.transitIconText}>🚌</Text>
                </View>
                <View style={styles.transitDetails}>
                  <View style={styles.lineHeader}>
                    <Text style={styles.lineName}>{line.id}</Text>
                    <Text style={styles.lineStatus}>{line.status}</Text>
                  </View>
                  <Text style={styles.transitName}>{line.name}</Text>
                  <Text style={styles.transitAddress}>
                    {line.distance}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* End Location */}
          <View style={styles.lineSeparator}>
            <View style={styles.verticalLine} />
          </View>

          <View style={styles.locationSection}>
            <View style={styles.endLocationIcon}>
              <Text style={styles.endIconText}>📍</Text>
            </View>
            <View style={styles.locationDetails}>
              <Text style={styles.distanceLabel}>{routeData.endDistance}</Text>
              <Text style={styles.locationName}>{routeData.endLocation}</Text>
              <Text style={styles.locationAddress}>
                {routeData.endAddress}
              </Text>
            </View>
          </View>

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
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  price: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },
  buyButton: {
    backgroundColor: "#E83B66",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  locationSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  locationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  locationDetails: {
    flex: 1,
  },
  distanceLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: "#999",
  },
  lineSeparator: {
    flexDirection: "row",
    marginLeft: 32,
    marginVertical: 8,
  },
  verticalLine: {
    width: 2,
    height: 24,
    backgroundColor: "#E0E0E0",
  },
  transitSection: {
    flexDirection: "row",
    marginBottom: 16,
  },
  transitIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transitIconText: {
    fontSize: 20,
  },
  transitDetails: {
    flex: 1,
  },
  lineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  lineName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginRight: 8,
  },
  lineStatus: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  transitName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  transitAddress: {
    fontSize: 13,
    color: "#999",
  },
  endLocationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E83B66",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  endIconText: {
    fontSize: 20,
  },
  mapButton: {
    backgroundColor: "#E83B66",
    borderRadius: 12,
    paddingVertical: 14,
    marginVertical: 24,
    marginBottom: 40,
    alignItems: "center",
  },
  mapButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
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
