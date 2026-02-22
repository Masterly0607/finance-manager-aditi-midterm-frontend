export interface BackendTransaction {
  id: number;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  createdAt: string;
}

export type BackendSummary = {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  net: number;
  accounts: any[];
};

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}

export type SummaryData = {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  net: number;
};

export type UISummary = {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  net: number;
};
