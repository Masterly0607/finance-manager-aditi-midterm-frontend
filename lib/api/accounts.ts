import { BASE_URL, TOKEN_KEY } from "../auth/AuthProvider";
import { Account, CreateAccount, UpdateAccount } from "../types";
import { api } from "./client";

export async function getAccounts() {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

  const res = await fetch(`${BASE_URL}/api/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return res.json();
}

export async function createAccount(data: CreateAccount) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;
  return api<Account>(
    "/api/accounts",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
}

export async function udpateAccount(id: number, data: UpdateAccount) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;
  if (!token) throw new Error("No token found");

  return api<Account>(
    `/api/accounts/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    token,
  );
}
