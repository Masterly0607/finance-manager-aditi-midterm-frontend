export type Role = "USER" | "ADMIN";

export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Account {
  id: number;
  userId: string;
  name: string;
  balance: number;
  createdAt: string;
}

export interface CreateAccount {
  name: string;
  balance: number;
}

export interface UpdateAccount {
  name: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userEmail?: string;
  accountId: string;
  accountName: string;
  type: TransactionType;
  amount: number;
  note: string;
  date: string;
  fromAccountName?: string;
  toAccountName?: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}
