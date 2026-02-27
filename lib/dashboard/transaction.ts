const BASE_URL = "https://financial-tracking-production.up.railway.app";

export const fetchTransactions = async (page: number, size: number) => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const res = await fetch(`${BASE_URL}/api/transactions?${params.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!res.ok) throw new Error("Failed to fetch");

  const json = await res.json();

  // 🔥 Normalize structure HERE
  return {
    transactions: json.data,
    pagination: json.pagination,
  };
};
