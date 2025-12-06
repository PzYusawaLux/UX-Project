import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOCATION_DATA = [
  {
    id: "1",
    name: "Carnegie Museum of Art",
    distance: "4.1 mi",
    liked: false,
  },
  {
    id: "2",
    name: "Phipps Conservatory",
    distance: "3.5 mi",
    liked: false,
  },
];

export default function Home({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("Latest");
  const [locations, setLocations] = useState(LOCATION_DATA);

  useEffect(() => {
    loadUsername();
  }, []);

  const loadUsername = async () => {
    try {
      const user = await AsyncStorage.getItem("app_current_user");
      if (user) {
        setUsername(user);
      }
    } catch (error) {
      console.error("Error loading username:", error);
    }
  };

  const handleSearch = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Search", { searchQuery: searchText });
    }
  };

  const toggleLike = (id: string) => {
    setLocations(
      locations.map((loc) => (loc.id === id ? { ...loc, liked: !loc.liked } : loc))
    );
  };

  const handleNavigation = (screenName: string) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(screenName);
    }
  };

  const renderLocationCard = ({ item }: any) => (
    <View style={styles.locationCard}>
      <View style={[styles.imageContainer, { backgroundColor: item.id === "1" ? "#90EE90" : "#87CEEB" }]}>
        <View style={styles.placeholderImage} />
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => toggleLike(item.id)}
          activeOpacity={0.7}
        >
          <Text style={[styles.likeIcon, item.liked && styles.likeIconActive]}>
            ♥
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationDistance}>{item.distance}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.pinkBlock} />
          <View style={styles.blueBlock} />

          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello, {username}</Text>
            <Text style={styles.mainTitle}>Where are we going now?</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Where to?"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.7}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Selection */}
        <View style={styles.tabContainer}>
          {["Latest", "Favorite"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Location List */}
        <ScrollView
          style={styles.locationsList}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={locations}
            renderItem={renderLocationCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContent}
          />
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("Settings")}
          activeOpacity={0.7}
          testID="nav-settings"
        >
          <Text style={styles.navIcon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("MapScreen")}
          activeOpacity={0.7}
          testID="nav-map"
        >
          <Text style={styles.navIcon}>📍</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("Home")}
          activeOpacity={0.7}
          testID="nav-home"
        >
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("TicketDetails")}
          activeOpacity={0.7}
          testID="nav-tickets"
        >
          <Text style={styles.navIcon}>🎫</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("Payment")}
          activeOpacity={0.7}
          testID="nav-payment"
        >
          <Text style={styles.navIcon}>💳</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#0B1B7A",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  pinkBlock: {
    position: "absolute",
    left: -40,
    top: -40,
    width: 180,
    height: 180,
    backgroundColor: "#E83B66",
    borderRadius: 90,
    opacity: 0.8,
  },
  blueBlock: {
    position: "absolute",
    right: -60,
    bottom: -60,
    width: 200,
    height: 200,
    backgroundColor: "#E83B66",
    borderRadius: 100,
    opacity: 0.8,
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
  },
  greeting: {
    fontSize: 12,
    color: "#B0B0FF",
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchIcon: {
    fontSize: 18,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 16,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
  },
  tabTextActive: {
    color: "#111",
  },
  locationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  locationCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F9F9F9",
  },
  imageContainer: {
    position: "relative",
    height: 160,
    backgroundColor: "#E0E0E0",
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: "#D0D0D0",
  },
  likeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  likeIcon: {
    fontSize: 18,
    color: "#ddd",
  },
  likeIconActive: {
    color: "#E83B66",
  },
  locationInfo: {
    padding: 12,
  },
  locationName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  locationDistance: {
    fontSize: 13,
    color: "#666",
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
  navButton: {
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

