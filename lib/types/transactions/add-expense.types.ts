import { Account } from "../account.types";

export type ExpenseForm = {
  accountId: string;
  amount: number;
  note: string;
  transactionDate: string;
};

export interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ExpenseForm) => void;
  accounts: Account[];
}

export interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    accountId: string;
    amount: number;
    note: string;
    date: string;
  }) => void;
  accounts: {
    id: string;
    name: string;
  }[];
}

export interface CreateTransactionRequest {
  type: "INCOME" | "EXPENSE";
  accountId: number | string;
  amount: number;
  note: string;
  transactionDate: string; 
}