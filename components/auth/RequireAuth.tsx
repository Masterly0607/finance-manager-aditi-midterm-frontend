"use client";
// Main goal: Stop users from accessing protected pages if they are not logged in.
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const TOKEN_KEY = "ACCESS_TOKEN";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace(`/?next=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);

  return <>{children}</>;
}
