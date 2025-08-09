import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type StoredUser = { name: string; email: string; password: string };
type PublicUser = { name: string; email: string };

type AuthContextType = {
  ready: boolean;
  user: PublicUser | null;
  users: PublicUser[];
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetAuthStorage?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "user";

// Demo seed
const DEMO_USER: StoredUser = {
  name: "Test User",
  email: "test@user.com",
  password: "123456",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<PublicUser | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // Load user list
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        let loaded: StoredUser[] = usersJson ? JSON.parse(usersJson) : [];

        // Ensure demo user exists
        const hasDemo = loaded.some(
          (u) => u.email.toLowerCase() === DEMO_USER.email.toLowerCase()
        );
        if (!hasDemo) {
          loaded = [...loaded, DEMO_USER];
          await AsyncStorage.setItem(USERS_KEY, JSON.stringify(loaded));
        }
        setUsers(loaded);

        // Load current logged-in user
        const currentJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
        if (currentJson) setUser(JSON.parse(currentJson));
      } catch (e) {
        console.warn("Auth bootstrap error:", e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    const listJson = await AsyncStorage.getItem(USERS_KEY);
    const list: StoredUser[] = listJson ? JSON.parse(listJson) : [];

    const normalized = email.trim().toLowerCase();
    const match = list.find(
      (u) =>
        u.email.trim().toLowerCase() === normalized && u.password === password
    );
    if (!match) throw new Error("Invalid credentials");

    const publicUser: PublicUser = { name: match.name, email: match.email };
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  };

  const signup = async (name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    const listJson = await AsyncStorage.getItem(USERS_KEY);
    const list: StoredUser[] = listJson ? JSON.parse(listJson) : [];

    if (list.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      throw new Error("An account with this email already exists");
    }

    const newUser: StoredUser = {
      name: name.trim(),
      email: normalizedEmail,
      password,
    };
    const updated = [...list, newUser];
    setUsers(updated);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));

    const publicUser: PublicUser = { name: newUser.name, email: newUser.email };
    setUser(publicUser);
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
  };

  const resetAuthStorage = async () => {
    await AsyncStorage.multiRemove([USERS_KEY, CURRENT_USER_KEY]);
    const seeded = [DEMO_USER];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(seeded));
    setUsers(seeded);
    setUser(null);
    setReady(true);
  };

  const publicUsers: PublicUser[] = users.map(({ name, email }) => ({
    name,
    email,
  }));

  return (
    <AuthContext.Provider
      value={{
        ready,
        user,
        users: publicUsers,
        login,
        signup,
        logout,
        resetAuthStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
