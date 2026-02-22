import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import {
  TransactionsQuery,
  Transaction,
  Pagination,
  BackendTransaction,
  TransactionsApiResponse,
} from "../../types/transactions/transaction.types";
import { Account } from "../../types/account.types";

export function useTransactions(query: TransactionsQuery) {
  return useQuery<{ transactions: Transaction[]; pagination: Pagination }, Error>({
    queryKey: ["transactions", query.account, query.type, query.search, query.page, query.pageSize],
    queryFn: async () => {
      const page = query.page ?? 0;
      const pageSize = query.pageSize ?? 8;

      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("pageSize", String(pageSize));

      if (query.account && query.account !== "all") {
        params.append("account", query.account);
      }

      if (query.type && query.type !== "all") {
        params.append("type", query.type);
      }

      if (query.search && query.search.trim() !== "") {
        params.append("search", query.search);
      }

      const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

      const res = await fetch(`${BASE_URL}/api/transactions?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const json: TransactionsApiResponse = await res.json();

      const transactions: Transaction[] = json.data.map((t: BackendTransaction) => ({
        id: String(t.id),
        userId: "",
        accountId: String(t.accountId),
        accountName: `Account ${t.accountId}`,
        type: t.transactionType,
        amount: t.amount,
        note: t.note,
        transactionDate: t.transactionDate,
        date: new Date(t.createdDate).toLocaleDateString(),
        userEmail: undefined,
        fromAccountName: undefined,
        toAccountName: undefined,
      }));

      return {
        transactions,
        pagination: json.pagination,
      };
    },
    staleTime: 1000 * 30,
  });
}

export function useAccounts() {
  return useQuery<Account[], Error>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const token = typeof window !== "undefined" ? sessionStorage.getItem("ACCESS_TOKEN") : null;

      const data = await api<any[]>("/api/accounts", {}, token);
      return data.map((a) => ({
        id: a.account_id,
        name: a.account_name,
        balance: a.account_balance,
        userId: a.user_id,
        createdAt: a.created_at,
      }));
    },
    staleTime: 1000 * 60,
  });
}
