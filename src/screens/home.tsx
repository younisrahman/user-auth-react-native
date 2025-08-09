import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/Colors";
import { useAuth } from "../Context/AuthContext";
export default function HomeScreen() {
  const { user, logout } = useAuth();
  const firstName = user?.name?.split(" ")?.[0] ?? "there";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome back, <Text style={styles.titleAccent}>{firstName}</Text> 👋
      </Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name
              ? user.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()
              : "U"}
          </Text>
        </View>

        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Email</Text>

        <Text style={[styles.value, styles.link]}>{user?.email}</Text>
      </View>

      <Pressable onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
    marginBottom: 18,
  },
  titleAccent: {
    color: Colors.light.tint,
  },
  card: {
    backgroundColor: Colors.light.inputBackground ?? "#F9F9F9",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border ?? "#E0E0E0",
    marginBottom: 24,
    overflow: "visible",
  },
  label: {
    fontSize: 12,
    color: Colors.light.textMuted ?? "#7A7A7A",
    marginTop: 10,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  link: {
    color: Colors.light.tint,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: Colors.light.tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    alignSelf: "flex-start",
    shadowColor: Colors.light.tint,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarText: {
    color: Colors.light.tint,
    fontWeight: "800",
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.light.buttonText ?? "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
