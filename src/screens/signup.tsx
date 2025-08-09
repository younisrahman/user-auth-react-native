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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen() {
  const navigation = useNavigation<AuthNavProp>();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  // field-level errors
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [verifyPasswordError, setVerifyPasswordError] = useState<string>("");

  // touched flags so we only show errors after user interacts
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    verifyPassword: false,
  });

  const validateName = (v: string) => {
    if (!v.trim()) return "Full name is required";
    return "";
  };

  const validateEmail = (v: string) => {
    if (!v.trim()) return "Email is required";
    if (!emailRegex.test(v.trim())) return "Enter a valid email address";
    return "";
  };

  const validatePassword = (v: string) => {
    if (!v) return "Password is required";
    if (v.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const validateVerify = (v: string, p: string) => {
    if (!v) return "Please re-enter your password";
    if (v !== p) return "Passwords do not match";
    return "";
  };

  const handleSignup = async () => {
    // run full validation
    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const vpErr = validateVerify(verifyPassword, password);

    setNameError(nErr);
    setEmailError(eErr);
    setPasswordError(pErr);
    setVerifyPasswordError(vpErr);
    setTouched({
      name: true,
      email: true,
      password: true,
      verifyPassword: true,
    });

    if (nErr || eErr || pErr || vpErr) return;

    try {
      await signup(name, email, password);
      // App stack will switch automatically
    } catch (e) {
      // surface signup error under email field (or toast, if you have one)
      setEmailError((e as Error)?.message || "Signup failed. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/kloudius.webp")}
        style={styles.logo}
      />
      <Text style={styles.title}>Create Account</Text>

      {/* Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={(v) => {
          setName(v);
          if (touched.name) setNameError(validateName(v));
        }}
        onBlur={() => {
          setTouched((t) => ({ ...t, name: true }));
          setNameError(validateName(name));
        }}
        style={[
          styles.input,
          touched.name && nameError ? styles.inputError : null,
        ]}
        autoCapitalize="words"
      />
      {touched.name && !!nameError && (
        <Text style={styles.error}>{nameError}</Text>
      )}

      {/* Email */}
      <Text style={styles.label}>E-mail</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          if (touched.email) setEmailError(validateEmail(v));
        }}
        onBlur={() => {
          setTouched((t) => ({ ...t, email: true }));
          setEmailError(validateEmail(email));
        }}
        style={[
          styles.input,
          touched.email && emailError ? styles.inputError : null,
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
      />
      {touched.email && !!emailError && (
        <Text style={styles.error}>{emailError}</Text>
      )}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View
        style={[
          styles.passwordWrapper,
          touched.password && passwordError ? styles.inputError : null,
        ]}
      >
        <TextInput
          placeholder="Enter your password"
          value={password}
          onChangeText={(v) => {
            setPassword(v);
            if (touched.password) setPasswordError(validatePassword(v));
            // keep verify in sync
            if (touched.verifyPassword)
              setVerifyPasswordError(validateVerify(verifyPassword, v));
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, password: true }));
            setPasswordError(validatePassword(password));
            if (touched.verifyPassword) {
              setVerifyPasswordError(validateVerify(verifyPassword, password));
            }
          }}
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          textContentType="oneTimeCode"
          autoComplete="off"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {touched.password && !!passwordError && (
        <Text style={styles.error}>{passwordError}</Text>
      )}

      {/* Verify Password */}
      <Text style={styles.label}>Verify Password</Text>
      <View
        style={[
          styles.passwordWrapper,
          touched.verifyPassword && verifyPasswordError
            ? styles.inputError
            : null,
        ]}
      >
        <TextInput
          placeholder="Re-enter your password"
          value={verifyPassword}
          onChangeText={(v) => {
            setVerifyPassword(v);
            if (touched.verifyPassword)
              setVerifyPasswordError(validateVerify(v, password));
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, verifyPassword: true }));
            setVerifyPasswordError(validateVerify(verifyPassword, password));
          }}
          style={styles.passwordInput}
          secureTextEntry={!showVerifyPassword}
          autoCapitalize="none"
          textContentType="oneTimeCode"
          autoComplete="off"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => setShowVerifyPassword(!showVerifyPassword)}
        >
          <Feather
            name={showVerifyPassword ? "eye-off" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      {touched.verifyPassword && !!verifyPasswordError && (
        <Text style={styles.error}>{verifyPasswordError}</Text>
      )}

      <Pressable onPress={handleSignup} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </Pressable>

      <Text style={styles.bottomText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.replace("Login")}>
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
  },
  logo: {
    width: 160,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  label: { fontWeight: "600", color: "#222", marginBottom: 6, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  inputError: {
    borderColor: "#D9534F",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  passwordInput: { flex: 1, height: 48 },
  error: { color: "#D9534F", marginBottom: 6 },
  primaryButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
  bottomText: { textAlign: "center", color: "#7a7a7a" },
  link: { color: Colors.light.tint, fontWeight: "600" },
});
