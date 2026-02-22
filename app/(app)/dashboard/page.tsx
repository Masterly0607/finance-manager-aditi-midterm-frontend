"use client";

import { SummaryCards } from "@/components/summary-cards";
import { TransactionTable } from "@/components/transaction-table";
import { MonthlyChart } from "@/components/monthly-chart";

import { useDashboardSummary } from "@/lib/hooks/dashboard/useDashboardSummary";
import { useTransactions } from "@/lib/hooks/transactions/useTransactions";


export default function DashboardPage() {
  const { summary, loading: summaryLoading, error: summaryError } = useDashboardSummary();
  const { data, isLoading, error } = useTransactions({ });

  return (
    <div className="p-6 space-y-6">
      {summary && <SummaryCards data={summary} />}
      <MonthlyChart data={} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}


