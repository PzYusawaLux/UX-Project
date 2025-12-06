import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Onboarding3({ navigation }: any) {
  const onBack = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const onFinish = () => {
    if (navigation && navigation.navigate) navigation.navigate("NewAccount");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logo} />
          <Text style={styles.title}>Easy ticket payment</Text>
          <Text style={styles.subtitle}>Quick and secure payment options for your journey</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back"
          testID="onboarding3-back"
        >
          <Text style={styles.navIcon}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onFinish}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Get started"
          testID="onboarding3-finish"
        >
          <Text style={styles.navIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#111",
    marginBottom: 22,
  },
  title: {
    color: "#111",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 6,
  },
  backButton: {
    position: "absolute",
    left: 22,
    bottom: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  nextButton: {
    position: "absolute",
    right: 22,
    bottom: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  navIcon: { fontSize: 30, color: "#111", lineHeight: 32 },
});
