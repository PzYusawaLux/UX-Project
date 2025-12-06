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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewAccount({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter a username");
      return false;
    }
    if (username.trim().length < 3) {
      Alert.alert("Error", "Username must be at least 3 characters");
      return false;
    }
    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      // Check if username already exists
      const existingUsers = await AsyncStorage.getItem("app_users");
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      if (users[username.trim()]) {
        Alert.alert("Account Exists", "This account already exists. Please log in.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
        ]);
        setLoading(false);
        return;
      }

      // Store new user credentials
      users[username.trim()] = {
        password: password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem("app_users", JSON.stringify(users));
      // Do NOT set app_current_user here - user needs to login first

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
      console.error("Error creating account:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("Login");
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
            <Text style={styles.logoText}>Create new account</Text>
          </View>

          <View style={styles.form}>
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
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
              style={[styles.createButton, loading && styles.buttonDisabled]}
              onPress={handleCreateAccount}
              disabled={loading}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Create account"
              testID="newaccount-create"
            >
              <Text style={styles.createButtonText}>{loading ? "Creating..." : "Continue"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelLink}
              onPress={handleCancel}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Already have account"
              testID="newaccount-login-link"
            >
              <Text style={styles.cancelLinkText}>Already have account</Text>
            </TouchableOpacity>
          </View>
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
  createButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelLink: {
    alignItems: "center",
    marginTop: 20,
  },
  cancelLinkText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
});
