import { Account } from "../account.types";

export type IncomeForm = {
  accountId: string;
  amount: number;
  note: string;
  transactionDate: string;
};

export type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IncomeForm) => void;
  accounts: Account[];
};

export interface AddIncomeDialogProps {
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
