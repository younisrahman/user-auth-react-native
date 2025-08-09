import { AuthNavProp } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { useAuth } from "../Context/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation<AuthNavProp>();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("Email and password are required");
    if (!email.includes("@")) return setError("Please enter a valid email");

    try {
      await login(email, password);
      // App.tsx will switch to Home stack
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/kloudius.webp")}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          textContentType="password"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.forgot}>Forgot Password?</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleLogin} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </Pressable>

      <Text style={styles.bottomText}>
        Don’t have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Signup")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontWeight: "600",
    marginBottom: 5,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  passwordWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 48,
  },
  forgot: {
    color: Colors.light.tint,
    textAlign: "right",
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    color: "#D9534F",
    textAlign: "center",
    marginBottom: 10,
  },
  bottomText: {
    textAlign: "center",
    color: "#7a7a7a",
  },
  link: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
});
