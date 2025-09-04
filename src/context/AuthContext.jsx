import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../config/api";


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || "");

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("auth_token", token);
    else localStorage.removeItem("auth_token");
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Invalid email or password");
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
    return data;
  };

  const signup = async ({ name, email, password }) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Registration failed (${res.status})`);
  }
  return data.user; // <- kontroler powinien zwrócić { user: {...}, message: ... }
};

  const logout = () => {
    setUser(null);
    setToken("");
  };

  const value = { user, token, login, signup, logout, isAuthed: !!user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
