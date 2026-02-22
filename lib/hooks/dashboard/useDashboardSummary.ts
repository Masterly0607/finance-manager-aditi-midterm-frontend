"use client";

import { api } from "@/lib/api/client";
import { BackendSummary, BackendTransaction } from "@/lib/types/dashboard/dashboard.types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


// Fetch all transactions
export async function fetchTransactions(): Promise<BackendTransaction[]> {
  return api<BackendTransaction[]>("/api/transactions");
}

// Fetch dashboard summary
export async function fetchDashboardSummary(): Promise<BackendSummary> {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("ACCESS_TOKEN")
      : null;

  return api<BackendSummary>(
    "/api/dashboard/summary",
    {
      method: "GET", // usually summary is GET
    },
    token
  );
}

export interface UISummary {
  totalBalance: number;
  income: number;
  expense: number;
}

export function useDashboardSummary() {
  const query = useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: async (): Promise<UISummary> => {
      const data: BackendSummary = await fetchDashboardSummary();

      return {
        totalBalance: data.totalBalance,
        income: data.totalIncome,
        expense: data.totalExpense,
      };
    },
  });

  return {
    summary: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
}