export interface BackendTransaction {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  createdAt: string;
}

export interface BackendSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}
export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}