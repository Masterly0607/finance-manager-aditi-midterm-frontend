"use client";

import { SummaryCards } from "@/components/summary-cards";
import { TransactionTable } from "@/components/transaction-table";
import { MonthlyChart } from "@/components/monthly-chart";

import { useDashboardSummary } from "@/lib/hooks/dashboard/useDashboardSummary";
import { useAccounts, useTransactions } from "@/lib/hooks/transactions/useTransactions";
import { generateMonthlyData } from "@/lib/generateMonthly";

export default function DashboardPage() {
  const { summary, loading: summaryLoading } = useDashboardSummary();

  const { data: transactionResponse, isLoading: transactionsLoading } = useTransactions({});

  const allTransactions = transactionResponse?.transactions ?? [];
  const { data: accounts = [] } = useAccounts();

  // 1️⃣ Remove TRANSFER
  const filteredTransactions = allTransactions.filter((tx) => tx.type !== "TRANSFER");

  // 2️⃣ Attach account name
  const transactionsWithAccount = filteredTransactions.map((t) => {
    const account = accounts.find((a) => String(a.id) === String(t.accountId));

    return {
      ...t,
      accountName: account?.name ?? "Unknown",
    };
  });

  // 3️⃣ Sort by transaction date (newest first)
  const sortedTransactions = [...transactionsWithAccount].sort((a, b) => {
    const [dayA, monthA, yearA] = a.date.split("/");
    const [dayB, monthB, yearB] = b.date.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();

    return dateB - dateA;
  });

  // 4️⃣ Take only 5 most recent
  const recentTransactions = sortedTransactions.slice(0, 5);

  // 5️⃣ Chart data
  const monthlyData = generateMonthlyData(filteredTransactions);

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
