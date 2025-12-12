import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Onboarding1({ navigation }: any) {
  const onNext = () => {
    if (navigation && navigation.navigate) navigation.navigate("Onboarding2");
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
          <Text style={styles.title}>Track the bus</Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNext}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Next"
          testID="onboarding1-next"
        >
          <Text style={styles.nextIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E83B66" },
  container: { 
    flex: 1, 
    backgroundColor: "#E83B66",
    overflow: "hidden",
    position: "relative",
  },
  topDecor: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#0B1B7A",
  },
  bottomDecor: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "#0B1B7A",
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
    color: "#E83B66",
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
  nextIcon: { fontSize: 28, color: "#E83B66", lineHeight: 32, fontWeight: "600" },
});
