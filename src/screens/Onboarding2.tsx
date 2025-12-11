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

export default function Onboarding2({ navigation }: any) {
  const onBack = () => {
    if (navigation && navigation.goBack) navigation.goBack();
  };

  const onNext = () => {
    if (navigation && navigation.navigate) navigation.navigate("Onboarding3");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Background decorative shapes */}
        <View style={styles.topDecor} />
        <View style={styles.bottomDecor} />

        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoArrow}>▲</Text>
          </View>
          <Text style={styles.title}>Plan your route</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Back"
          testID="onboarding2-back"
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Next"
          testID="onboarding2-next"
        >
          <Text style={styles.nextIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B1B7A" },
  container: { 
    flex: 1, 
    backgroundColor: "#0B1B7A",
    overflow: "hidden",
    position: "relative",
  },
  topDecor: {
    position: "absolute",
    top: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E83B66",
  },
  bottomDecor: {
    position: "absolute",
    bottom: -100,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#E83B66",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    zIndex: 1,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  logoArrow: {
    fontSize: 12,
    color: "#0B1B7A",
    fontWeight: "700",
  },
  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#fff",
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
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    zIndex: 2,
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
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
    zIndex: 2,
  },
  backIcon: { fontSize: 28, color: "#0B1B7A", lineHeight: 32, fontWeight: "600" },
  nextIcon: { fontSize: 28, color: "#0B1B7A", lineHeight: 32, fontWeight: "600" },
  navIcon: { fontSize: 30, color: "#111", lineHeight: 32 },
});
