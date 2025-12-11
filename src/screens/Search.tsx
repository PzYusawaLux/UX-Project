import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView as RNSafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SEARCH_RESULTS = [
  { id: "1", name: "Cityview Apartment, Pittsburgh", distance: "7.2 mi", liked: false },
  { id: "2", name: "Lawrence Hall, Pittsburgh", distance: "8.3 mi", liked: false },
  { id: "3", name: "Giant Eagle, Pittsburgh", distance: "3.6 mi", liked: false },
  { id: "4", name: "Pittsburgh International Airport (PIT), Pittsburgh", distance: "22.7 mi", liked: false },
];

export default function Search({ navigation, route }: any) {
  const [username, setUsername] = useState("");
  const [searchText, setSearchText] = useState(route?.params?.searchQuery || "");
  const [results, setResults] = useState(SEARCH_RESULTS);

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

  const handleSearch = (text: string) => {
    setSearchText(text);
    // Always show all preset results regardless of search text
    setResults(SEARCH_RESULTS);
  };

  const toggleLike = (id: string) => {
    setResults(
      results.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handleClose = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleResultClick = (item: any) => {
    if (navigation && navigation.navigate) {
      navigation.navigate("YourRoute", { location: item });
    }
  };

  const renderResultItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleResultClick(item)}
      activeOpacity={0.7}
    >
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => toggleLike(item.id)}
        activeOpacity={0.7}
      >
        <Text style={[styles.likeIcon, item.liked && styles.likeIconActive]}>
          ♥
        </Text>
      </TouchableOpacity>
      <View style={styles.resultContent}>
        <Text style={styles.resultName}>{item.name}</Text>
        <Text style={styles.resultDistance}>{item.distance}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header with Search Box */}
        <View style={styles.header}>
          <View style={styles.searchBoxContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search locations..."
              placeholderTextColor="#ccc"
              value={searchText}
              onChangeText={handleSearch}
              autoFocus
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* User Greeting */}
          <Text style={styles.greeting}>Hello, {username}</Text>
        </View>

        {/* Search Results List */}
        <FlatList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollIndicatorInsets={{ right: 1 }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#0B1B7A",
  },
  container: { 
    flex: 1, 
    backgroundColor: "#0B1B7A",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: "#0B1B7A",
    position: "relative",
    overflow: "hidden",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: "#fff",
    color: "#000",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  closeIcon: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0B1B7A",
  },
  greeting: {
    fontSize: 14,
    color: "#D0D0FF",
    fontWeight: "500",
    marginLeft: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    gap: 14,
  },
  likeButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  likeIcon: {
    fontSize: 20,
    color: "#6B7BA0",
  },
  likeIconActive: {
    color: "#FF6B9D",
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  resultDistance: {
    fontSize: 12,
    color: "#A8B5FF",
    fontWeight: "400",
  },
});

