export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

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
