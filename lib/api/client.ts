// Network layer
/*
Main Goal of This File

This file creates a reusable API function that:

✅ Connects frontend to backend

✅ Automatically attaches JWT token

✅ Handles errors

✅ Handles JSON response

✅ Sends cookies (refresh token)

Instead of writing fetch() everywhere, you write it once here and reuse it everywhere.

*/
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function api<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string | null,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },

    credentials: "include", //
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}
