"use client";

import { useEffect, useMemo, useState } from "react";

import { SummaryCards } from "@/components/summary-cards";
import { TransactionTable } from "@/components/transaction-table";
import { MonthlyChart } from "@/components/monthly-chart";

import { useDashboardSummary } from "@/lib/hooks/dashboard/useDashboardSummary";
import { useAccounts, useTransactions } from "@/lib/hooks/transactions/useTransactions";
import { generateMonthlyData } from "@/lib/generateMonthly";
import { fetchTransactions } from "@/lib/dashboard/transaction";

export default function DashboardPage() {
  const { summary, loading: summaryLoading } = useDashboardSummary();
  const { data: accounts = [] } = useAccounts();

  // Fetch first page (page 0 because backend is 0-based)
  const { data: firstPage, isLoading: transactionsLoading } = useTransactions({ page: 0, size: 8 });

  const [allTransactions, setAllTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllPages = async () => {
      if (!firstPage?.pagination?.totalPage) return;

      const totalPages = firstPage.pagination.totalPage;

      let merged = [...firstPage.transactions];

      for (let page = 1; page < totalPages; page++) {
        const result = await fetchTransactions(page, 8);
        merged = [...merged, ...result.transactions];
      }

      setAllTransactions(merged);
    };

    fetchAllPages();
  }, [firstPage]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter((tx) => tx.type !== "TRANSFER");
  }, [allTransactions]);

  const transactionsWithAccount = useMemo(() => {
    return filteredTransactions.map((t) => {
      const account = accounts.find((a) => String(a.id) === String(t.accountId));

      return {
        ...t,
        accountName: account?.name ?? "Unknown",
      };
    });
  }, [filteredTransactions, accounts]);

  const sortedTransactions = useMemo(() => {
    return [...transactionsWithAccount].sort((a, b) => {
      if (!a.date || !b.date) return 0;

      const [dayA, monthA, yearA] = a.date.split("/");
      const [dayB, monthB, yearB] = b.date.split("/");

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();

      return dateB - dateA;
    });
  }, [transactionsWithAccount]);

  const recentTransactions = sortedTransactions.slice(0, 5);

  const monthlyData = useMemo(() => {
    return generateMonthlyData(filteredTransactions);
  }, [filteredTransactions]);

  if (summaryLoading || transactionsLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {summary && <SummaryCards data={summary} />}
      <MonthlyChart data={monthlyData} />
      <TransactionTable transactions={recentTransactions} />
    </div>
  );
}
