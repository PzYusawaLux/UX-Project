import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Utility function to generate random password
const generateRandomPassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function ForgotPassword({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(0); // 0: enter username, 1: choose method, 2: manual reset, 3: random reset
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [randomPassword, setRandomPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRandomPassword, setShowRandomPassword] = useState(false);

  const handleFindAccount = async () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter username");
      return;
    }

    setLoading(true);
    try {
      const existingUsers = await AsyncStorage.getItem("app_users");
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      if (!users[username.trim()]) {
        Alert.alert("Error", "Username not found");
        setLoading(false);
        return;
      }

      setStep(1); // Move to method selection
    } catch (error) {
      Alert.alert("Error", "Failed to find account");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualReset = () => {
    setStep(2);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleRandomReset = () => {
    const pwd = generateRandomPassword();
    setRandomPassword(pwd);
    setStep(3);
  };

  const handleConfirmManualReset = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter new password");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const existingUsers = await AsyncStorage.getItem("app_users");
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      users[username.trim()].password = newPassword;
      await AsyncStorage.setItem("app_users", JSON.stringify(users));

      Alert.alert("Success", "Password reset successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to reset password");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRandomReset = async () => {
    setLoading(true);
    try {
      const existingUsers = await AsyncStorage.getItem("app_users");
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      users[username.trim()].password = randomPassword;
      await AsyncStorage.setItem("app_users", JSON.stringify(users));

      Alert.alert("Success", `Your new password is: ${randomPassword}\n\nPlease save it somewhere safe.`, [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to reset password");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 0) {
      if (navigation && navigation.goBack) {
        navigation.goBack();
      }
    } else {
      setStep(step - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.logo} />
            <Text style={styles.logoText}>Reset password</Text>
          </View>

          {/* Step 0: Enter Username */}
          {step === 0 && (
            <View style={styles.form}>
              <Text style={styles.stepTitle}>Enter your username to find your account</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  editable={!loading}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleFindAccount}
                disabled={loading}
                activeOpacity={0.8}
                testID="forgot-find"
              >
                <Text style={styles.primaryButtonText}>{loading ? "Searching..." : "Continue"}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 1: Choose Reset Method */}
          {step === 1 && (
            <View style={styles.form}>
              <Text style={styles.stepTitle}>How would you like to reset your password?</Text>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleManualReset}
                activeOpacity={0.8}
                testID="forgot-manual"
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Set new password</Text>
                  <Text style={styles.optionDescription}>Create your own password</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleRandomReset}
                activeOpacity={0.8}
                testID="forgot-random"
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Generate random password</Text>
                  <Text style={styles.optionDescription}>System will generate a secure password</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2: Manual Reset */}
          {step === 2 && (
            <View style={styles.form}>
              <Text style={styles.stepTitle}>Create a new password</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#999"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  editable={!loading}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!loading}
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleConfirmManualReset}
                disabled={loading}
                activeOpacity={0.8}
                testID="forgot-confirm-manual"
              >
                <Text style={styles.primaryButtonText}>{loading ? "Resetting..." : "Confirm"}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 3: Random Reset */}
          {step === 3 && (
            <View style={styles.form}>
              <Text style={styles.stepTitle}>Your new password is:</Text>
              <View style={styles.passwordBox}>
                <Text
                  style={styles.passwordText}
                  selectable
                  testID="forgot-random-password"
                >
                  {showRandomPassword ? randomPassword : "••••••••"}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowRandomPassword(!showRandomPassword)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.showHideText}>{showRandomPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.warningText}>Please save this password somewhere safe.</Text>

              <TouchableOpacity
                style={[styles.primaryButton, loading && styles.buttonDisabled]}
                onPress={handleConfirmRandomReset}
                disabled={loading}
                activeOpacity={0.8}
                testID="forgot-confirm-random"
              >
                <Text style={styles.primaryButtonText}>{loading ? "Confirming..." : "Confirm"}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back Button */}
          {step > 0 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Back"
              testID="forgot-back"
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logo: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#111",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  form: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 24,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111",
  },
  primaryButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#F9F9F9",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 13,
    color: "#666",
  },
  passwordBox: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
  },
  passwordText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    flex: 1,
  },
  showHideText: {
    fontSize: 13,
    color: "#E83B66",
    fontWeight: "600",
  },
  warningText: {
    fontSize: 13,
    color: "#E83B66",
    marginBottom: 20,
    fontWeight: "500",
  },
  backButton: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
});

