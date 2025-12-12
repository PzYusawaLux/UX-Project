import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TICKETS_LIST = [
  {
    id: "1",
    date: "09.22.2025",
    time: "08:49",
    status: "ACTIVE",
    from: "CVA",
    to: "CAC",
    then: "PM",
    price: 14.9,
    paid: true,
    paymentStatus: "Paid",
    requiresPurchase: true,
  },
  {
    id: "2",
    date: "09.17.2025",
    time: "22:08",
    status: "ACCEPTED",
    from: "CAC",
    to: "PM",
    then: "",
    price: 7.4,
    paid: true,
    paymentStatus: "Paid",
    requiresPurchase: false,
  },
  {
    id: "3",
    date: "09.13.2025",
    time: "09:02",
    status: "ACCEPTED",
    from: "CVA",
    to: "CAC",
    then: "PM",
    price: null,
    paid: true,
    paymentStatus: "Paid",
    requiresPurchase: false,
  },
];

export default function TicketDetails({ navigation }: any) {
  const [sortBy, setSortBy] = useState("LATEST");
  const [hasTicketPurchased, setHasTicketPurchased] = useState(false);

  const loadTicketPurchaseStatus = async () => {
    try {
      const purchased = await AsyncStorage.getItem("ticketPurchased");
      setHasTicketPurchased(purchased === "true");
    } catch (error) {
      console.log("Error loading ticket status:", error);
    }
  };

  useEffect(() => {
    loadTicketPurchaseStatus();
  }, []);

  const useFocusEffect = React.useCallback(() => {
    loadTicketPurchaseStatus();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation?.addListener("focus", useFocusEffect);
    return unsubscribe;
  }, [navigation, useFocusEffect]);

  const handleAddNew = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Search");
    }
  };

  const handleNavTab = (screen: string) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(screen);
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "#4CAF50";
    return "#E0E0E0";
  };

  const getStatusTextColor = (status: string) => {
    if (status === "ACTIVE") return "#fff";
    return "#999";
  };

  const renderTicketItem = (ticket: any) => {
    // 只有在购票后才显示需要购票的ticket
    if (ticket.requiresPurchase && !hasTicketPurchased) {
      return null;
    }

    return (
      <View key={ticket.id} style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <View>
          <Text style={styles.ticketDate}>{ticket.date}</Text>
          <Text style={styles.ticketTime}>({ticket.time})</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(ticket.status) },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: getStatusTextColor(ticket.status) },
            ]}
          >
            {ticket.status}
          </Text>
        </View>
      </View>

      <View style={styles.ticketRoute}>
        <Text style={styles.routeStop}>{ticket.from}</Text>
        <Text style={styles.routeArrow}>→</Text>
        <Text style={styles.routeStop}>{ticket.to}</Text>
        {ticket.then && (
          <>
            <Text style={styles.routeArrow}>→</Text>
            <Text style={styles.routeStop}>{ticket.then}</Text>
          </>
        )}
      </View>

      <View style={styles.separator} />

      <View style={styles.ticketFooter}>
        {ticket.price !== null && (
          <Text style={styles.price}>${ticket.price}</Text>
        )}
        <View style={styles.paidBadge}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.paidText}>{ticket.paymentStatus}</Text>
        </View>
      </View>
    </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerGradient}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Tickets</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddNew}
                activeOpacity={0.7}
              >
                <Text style={styles.addButtonText}>+ Add New</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by</Text>
            <TouchableOpacity style={styles.sortDropdown} activeOpacity={0.7}>
              <Text style={styles.sortValue}>{sortBy}</Text>
              <Text style={styles.sortIcon}>⇅</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {TICKETS_LIST.map(renderTicketItem)}
        </ScrollView>

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
            style={[styles.navTab, styles.navTabActive]}
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
  headerContainer: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#E83B66",
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#0B1B7A",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
  sortContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    marginBottom: 8,
  },
  sortDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sortValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },
  sortIcon: {
    fontSize: 14,
    color: "#999",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 12,
  },
  ticketCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  ticketDate: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
    marginBottom: 2,
  },
  ticketTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  ticketRoute: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  routeStop: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginHorizontal: 6,
  },
  routeArrow: {
    fontSize: 13,
    fontWeight: "600",
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
    borderStyle: "dashed",
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 32,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
    minWidth: 50,
  },
  paidBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  checkmark: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4CAF50",
    marginRight: 6,
  },
  paidText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CAF50",
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

