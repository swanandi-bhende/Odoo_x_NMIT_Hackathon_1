// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // ✅ Signup (save to localStorage "users" array)
  const signup = useCallback(async (credentials) => {
    const { email, password, firstName, lastName, username } = credentials;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // check if email already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: Date.now(),
      email,
      password, // ⚠️ plain text just for demo! (don’t do this in real apps)
      firstName,
      lastName,
      username,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);

    return newUser;
  }, []);

  // ✅ Login (check localStorage)
  const login = useCallback(async ({ email, password }) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) throw new Error("Invalid email or password");

    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    setUser(existingUser);
    return existingUser;
  }, []);

  // ✅ Logout
  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
