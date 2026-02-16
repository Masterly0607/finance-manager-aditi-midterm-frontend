"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const TOKEN_KEY = "ACCESS_TOKEN";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}
