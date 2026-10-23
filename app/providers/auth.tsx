"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = { name: string };

type Auth = {
  user: User | null;
  login: (u: User | null) => void; // null = invitado
  signOut: () => void;
};

const AuthContext = createContext<Auth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Hidratar sesión tras montar (evita hydration mismatch / SSR sin localStorage).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación post-montaje desde localStorage
      setUser(JSON.parse(localStorage.getItem("av_user") || "null"));
    } catch {
      setUser(null);
    }
  }, []);

  const login = (u: User | null) => {
    setUser(u);
    try {
      localStorage.setItem("av_user", JSON.stringify(u));
    } catch {}
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem("av_user");
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): Auth {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
