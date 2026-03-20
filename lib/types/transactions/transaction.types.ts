export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface TransactionsQuery {
  account?: string;
  type?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface BackendTransaction {
  id: number;
  accountId: number;
  amount: number;
  createdDate: string;
  note: string;
  transactionType: TransactionType;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

export interface BackendTransaction {
  id: number;
  accountId: number;
  amount: number;
  createdDate: string;
  note: string;
  transactionDate: string;
  transactionType: TransactionType;
}

export interface TransactionsApiResponse {
  data: BackendTransaction[];
  pagination: Pagination;
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
  transactionDate: String;
  date: string;
  fromAccountName?: string;
  toAccountName?: string;
}
