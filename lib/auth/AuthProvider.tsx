"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types";

type AuthResponse = { token: string };

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const TOKEN_KEY = "ACCESS_TOKEN";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchMe = useCallback(async (token: string) => {
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
    });

    if (!meRes.ok) throw new Error("Failed to load profile");

    const me = (await meRes.json()) as User;
    setUser(me);
  }, []);

  // Restore user after refresh using token in sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return;

    setIsLoading(true);
    fetchMe(token)
      .catch(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [fetchMe]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Invalid email or password");
        }

        const data = (await res.json()) as AuthResponse;

        sessionStorage.setItem(TOKEN_KEY, data.token);
        await fetchMe(data.token);

        router.replace("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router, fetchMe]
  );

  const register = useCallback(
    async (email: string, password: string, confirmPassword: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, confirmPassword }),
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Registration failed");
        }

        const data = (await res.json()) as AuthResponse;

        sessionStorage.setItem(TOKEN_KEY, data.token);
        await fetchMe(data.token);

        router.replace("/dashboard");
      } finally {
        setIsLoading(false);
      }
    },
    [router, fetchMe]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    router.replace("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
