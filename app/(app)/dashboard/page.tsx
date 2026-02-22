import { MonthlyChart } from "@/components/monthly-chart";
import { SummaryCards } from "@/components/summary-cards";
import { TransactionTable } from "@/components/transaction-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary, mockMonthlySummary, mockTransactions } from "@/lib/mock/mock-data";

import React from "react";

function DashboardPage() {
  const summary = getDashboardSummary();
  const recentTransactions = mockTransactions
    .filter((t) => t.userId === "u1")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your financial overview at a glance.</p>
      </div>

      <SummaryCards data={summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart data={mockMonthlySummary} />
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TransactionTable transactions={recentTransactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
