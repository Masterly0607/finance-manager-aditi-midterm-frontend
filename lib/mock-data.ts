import { User, Account, Transaction, MonthlySummary } from "./types";

export const mockCurrentUser: User = {
  id: "u1",
  email: "john@example.com",
  role: "ADMIN",
  createdAt: "2025-01-15",
};

export const mockUsers: User[] = [
  { id: "u1", email: "john@example.com", role: "ADMIN", createdAt: "2025-01-15" },
  { id: "u2", email: "jane@example.com", role: "USER", createdAt: "2025-02-20" },
  { id: "u3", email: "alice@example.com", role: "USER", createdAt: "2025-03-10" },
  { id: "u4", email: "bob@example.com", role: "USER", createdAt: "2025-04-05" },
  { id: "u5", email: "carol@example.com", role: "ADMIN", createdAt: "2025-05-12" },
];

export const mockAccounts: Account[] = [
  { id: "a1", userId: "u1", name: "Main Checking", balance: 5240.5, createdAt: "2025-01-15" },
  { id: "a2", userId: "u1", name: "Savings", balance: 12800.0, createdAt: "2025-01-20" },
  { id: "a3", userId: "u1", name: "Emergency Fund", balance: 3500.75, createdAt: "2025-02-10" },
  { id: "a4", userId: "u1", name: "Investment", balance: 8900.0, createdAt: "2025-03-01" },
];

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "INCOME",
    amount: 4500,
    note: "Monthly salary",
    date: "2026-02-01",
  },
  {
    id: "t2",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "EXPENSE",
    amount: 120.5,
    note: "Groceries",
    date: "2026-02-03",
  },
  {
    id: "t3",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a2",
    accountName: "Savings",
    type: "INCOME",
    amount: 1000,
    note: "Transfer from checking",
    date: "2026-02-05",
  },
  {
    id: "t4",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "EXPENSE",
    amount: 85.0,
    note: "Electric bill",
    date: "2026-02-06",
  },
  {
    id: "t5",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "EXPENSE",
    amount: 45.99,
    note: "Internet subscription",
    date: "2026-02-07",
  },
  {
    id: "t6",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a3",
    accountName: "Emergency Fund",
    type: "INCOME",
    amount: 500,
    note: "Monthly savings",
    date: "2026-02-08",
  },
  {
    id: "t7",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "EXPENSE",
    amount: 32.5,
    note: "Coffee shop",
    date: "2026-02-09",
  },
  {
    id: "t8",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a4",
    accountName: "Investment",
    type: "INCOME",
    amount: 250,
    note: "Dividend payment",
    date: "2026-02-10",
  },
  {
    id: "t9",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "EXPENSE",
    amount: 200,
    note: "Car insurance",
    date: "2026-02-11",
  },
  {
    id: "t10",
    userId: "u1",
    userEmail: "john@example.com",
    accountId: "a1",
    accountName: "Main Checking",
    type: "TRANSFER",
    amount: 500,
    note: "To savings",
    date: "2026-02-12",
    fromAccountName: "Main Checking",
    toAccountName: "Savings",
  },
  {
    id: "t11",
    userId: "u2",
    userEmail: "jane@example.com",
    accountId: "a5",
    accountName: "Personal",
    type: "INCOME",
    amount: 3200,
    note: "Freelance work",
    date: "2026-02-01",
  },
  {
    id: "t12",
    userId: "u2",
    userEmail: "jane@example.com",
    accountId: "a5",
    accountName: "Personal",
    type: "EXPENSE",
    amount: 75,
    note: "Books",
    date: "2026-02-04",
  },
  {
    id: "t13",
    userId: "u3",
    userEmail: "alice@example.com",
    accountId: "a6",
    accountName: "Work Account",
    type: "INCOME",
    amount: 5500,
    note: "Salary",
    date: "2026-01-28",
  },
  {
    id: "t14",
    userId: "u3",
    userEmail: "alice@example.com",
    accountId: "a6",
    accountName: "Work Account",
    type: "EXPENSE",
    amount: 150,
    note: "Gym membership",
    date: "2026-01-30",
  },
];

export const mockTransfers: Transaction[] = mockTransactions.filter(
  (t) => t.type === "TRANSFER" && t.userId === "u1",
);

export const mockMonthlySummary: MonthlySummary[] = [
  { month: "Sep", income: 5200, expense: 3100 },
  { month: "Oct", income: 5450, expense: 3600 },
  { month: "Nov", income: 4800, expense: 2900 },
  { month: "Dec", income: 6200, expense: 4100 },
  { month: "Jan", income: 5100, expense: 3400 },
  { month: "Feb", income: 6250, expense: 483.99 },
];

export function getDashboardSummary() {
  const userTransactions = mockTransactions.filter(
    (t) => t.userId === "u1" && t.date.startsWith("2026-02"),
  );
  const totalBalance = mockAccounts.reduce((sum, a) => sum + a.balance, 0);
  const monthIncome = userTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);
  const monthExpense = userTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance,
    monthIncome,
    monthExpense,
    net: monthIncome - monthExpense,
  };
}
