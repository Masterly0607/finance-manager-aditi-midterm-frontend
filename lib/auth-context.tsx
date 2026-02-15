"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { User, Role } from "./types"
import { mockCurrentUser } from "./mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(mockCurrentUser)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = useCallback(
    async (email: string, _password: string) => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1000))
      setUser({
        ...mockCurrentUser,
        email,
        role: email.includes("admin") ? ("ADMIN" as Role) : ("USER" as Role),
      })
      setIsLoading(false)
      router.push("/dashboard")
    },
    [router]
  )

  const register = useCallback(
    async (email: string, _password: string) => {
      setIsLoading(true)
      await new Promise((r) => setTimeout(r, 1000))
      setUser({
        ...mockCurrentUser,
        email,
        role: "USER",
      })
      setIsLoading(false)
      router.push("/dashboard")
    },
    [router]
  )

  const logout = useCallback(() => {
    setUser(null)
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
