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
  { id: "2", name: "Larence Hall, Pittsburgh", distance: "8.3 mi", liked: false },
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
  safe: { flex: 1, backgroundColor: "#0B1B7A" },
  container: { flex: 1, backgroundColor: "#0B1B7A" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#0B1B7A",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#111",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
  greeting: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    gap: 12,
  },
  likeButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  likeIcon: {
    fontSize: 18,
    color: "#6B7BA0",
  },
  likeIconActive: {
    color: "#fff",
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
    fontSize: 13,
    color: "#B0B0FF",
  },
});

