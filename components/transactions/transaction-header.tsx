"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  onAddIncome: () => void;
  onAddExpense: () => void;
}

export function TransactionsHeader({ onAddIncome, onAddExpense }: Props) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">View and manage your transactions.</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onAddIncome}>
          <TrendingUp className="mr-2 h-4 w-4" />
          Add Income
        </Button>
        <Button variant="outline" onClick={onAddExpense}>
          <TrendingDown className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}
