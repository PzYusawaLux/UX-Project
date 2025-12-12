import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FAQ({ navigation, route }: any) {
  const [isSolved, setIsSolved] = useState(false);
  const question = route?.params?.question || "Sample question";

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
          <TouchableOpacity 
            onPress={() => navigation.navigate("Help")}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{question}</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.answerLabel}>Sample question</Text>
          <Text style={styles.answerText}>
            This is the space where a question would go based on user experience problems or issues with the app
          </Text>

          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackLabel}>Did you manage to solve your problem?</Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[
                  styles.feedbackButton,
                  isSolved === true && styles.feedbackButtonActive
                ]}
                activeOpacity={0.7}
                onPress={() => setIsSolved(true)}
              >
                <Text style={[
                  styles.feedbackButtonText,
                  isSolved === true && styles.feedbackButtonTextActive
                ]}>
                  YES
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.feedbackButton,
                  isSolved === false && styles.feedbackButtonActive
                ]}
                activeOpacity={0.7}
                onPress={() => setIsSolved(false)}
              >
                <Text style={[
                  styles.feedbackButtonText,
                  isSolved === false && styles.feedbackButtonTextActive
                ]}>
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.contactButton} activeOpacity={0.7}>
            <Text style={styles.contactButtonText}>Contact with support</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={[styles.navTab, styles.navTabActive]}
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
  backButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    color: "#0B1B7A",
    fontWeight: "700",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
    lineHeight: 20,
    marginBottom: 32,
  },
  feedbackSection: {
    marginBottom: 32,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  feedbackButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackButtonActive: {
    backgroundColor: "#E83B66",
    borderColor: "#E83B66",
  },
  feedbackButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 0.5,
  },
  feedbackButtonTextActive: {
    color: "#fff",
  },
  contactButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
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
