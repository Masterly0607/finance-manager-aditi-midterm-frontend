import { BASE_URL, TOKEN_KEY } from "../auth/AuthProvider";
import { CreateAccountDto, UpdateAccountDto } from "../types";

export async function getAccounts() {

  const res = await fetch(`${BASE_URL}/api/accounts`, {
    headers: { Authorization: `Bearer ${token}` },
      credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return res.json();
}

export async function createAccount(data: CreateAccountDto) {
  const res = await fetch(`${BASE_URL}/api/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function udpateAccount(data: UpdateAccountDto) {
  const res = await fetch(`${BASE_URL}/api/accounts`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
