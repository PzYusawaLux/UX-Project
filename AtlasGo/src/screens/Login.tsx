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

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      // Retrieve stored users from AsyncStorage
      const existingUsers = await AsyncStorage.getItem("app_users");
      const users = existingUsers ? JSON.parse(existingUsers) : {};

      // Check if username exists
      if (!users[username.trim()]) {
        setAttemptCount(attemptCount + 1);
        Alert.alert("Error", "Username or password incorrect");
        setLoading(false);
        return;
      }

      // Check if password matches
      if (users[username.trim()].password !== password) {
        setAttemptCount(attemptCount + 1);
        Alert.alert("Error", "Username or password incorrect");
        setLoading(false);
        return;
      }

      // Login successful
      await AsyncStorage.setItem("app_current_user", username.trim());
      setAttemptCount(0);
      setUsername("");
      setPassword("");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("NewAccount");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
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
            <Text style={styles.logoText}>Login account</Text>
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

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Login"
              testID="login-button"
            >
              <Text style={styles.loginButtonText}>{loading ? "Logging in..." : "Continue"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={handleForgotPassword}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
              testID="login-forgot"
            >
              <Text style={styles.forgotPasswordLinkText}>Forgot password?</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.signupLink}
              onPress={handleCreateAccount}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Create new account"
              testID="login-signup"
            >
              <Text style={styles.signupLinkText}>Create new account</Text>
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
  loginButton: {
    backgroundColor: "#E83B66",
    borderRadius: 24,
    paddingVertical: 14,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  forgotPasswordLink: {
    alignItems: "center",
    marginTop: 16,
  },
  forgotPasswordLinkText: {
    fontSize: 14,
    color: "#E83B66",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  signupLink: {
    alignItems: "center",
  },
  signupLinkText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
});

