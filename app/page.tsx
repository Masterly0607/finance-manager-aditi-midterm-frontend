"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">💰 Personal Finance Manager</h1>
        <p className="text-muted-foreground">
          Track your income, expenses, and manage accounts easily.
        </p>

        <div className="space-x-4">
          <a href="/login" className="px-6 py-2 bg-black text-white rounded-lg">
            Login
          </a>

          <a href="/register" className="px-6 py-2 border rounded-lg">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
