"use client";

import { useEffect, useState } from "react";
import {
  TransactionsHeader,
  AddIncomeDialog,
  AddExpenseDialog,
  TransactionFilters,
  TransactionsPagination,
} from "@/components/transactions";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { useAccounts, useTransactions } from "@/lib/hooks/transactions/useTransactions";
import { useCreateTransaction } from "@/lib/hooks/transactions/useCreateTransaction";

const PAGE_SIZE = 8;

export default function TransactionsPage() {
  const createTransaction = useCreateTransaction();
  const [filterAccount, setFilterAccount] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchNote, setSearchNote] = useState("");
  const [page, setPage] = useState(0);

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  const { data, isLoading, error } = useTransactions({
    account: filterAccount,
    type: filterType,
    search: searchNote,
    page,
    pageSize: PAGE_SIZE,
  });
  const { data: accounts = [] } = useAccounts();

  const transactions =
    data?.transactions.map((t) => {
      const account = accounts.find((a) => String(a.id) === String(t.accountId));

      return {
        ...t,
        accountName: account?.name ?? "Unknown",
      };
    }) ?? [];
  const currentPage = (data?.pagination?.page ?? 0) + 1;
  const totalPages = data?.pagination?.totalPage ?? 1;
  const totalItems = data?.pagination?.total ?? 0;

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading transactions…</p>;
  if (error) return <p className="text-sm text-destructive">Failed to load transactions</p>;

  if (!data) return null;
  return (
    <div className="flex flex-col gap-6">
      <TransactionsHeader
        onAddIncome={() => setIncomeOpen(true)}
        onAddExpense={() => setExpenseOpen(true)}
      />

      <AddExpenseDialog
        open={expenseOpen}
        onOpenChange={setExpenseOpen}
        accounts={accounts}
        onSubmit={(data) => {
          createTransaction.mutate({
            type: "EXPENSE",
            accountId: data.accountId,
            amount: data.amount,
            note: data.note,
            transactionDate: data.transactionDate,
          });
        }}
      />

      <AddIncomeDialog
        open={incomeOpen}
        onOpenChange={setIncomeOpen}
        accounts={accounts}
        onSubmit={(data) => {
          createTransaction.mutate({
            type: "INCOME",
            accountId: data.accountId,
            amount: data.amount,
            note: data.note,
            transactionDate: data.transactionDate,
          });
        }}
      />

      <TransactionFilters
        filterAccount={filterAccount}
        filterType={filterType}
        searchNote={searchNote}
        onAccountChange={(v) => {
          setFilterAccount(v);
          setPage(0);
        }}
        onTypeChange={(v) => {
          setFilterType(v);
          setPage(0);
        }}
        onSearchChange={(v) => {
          setSearchNote(v);
          setPage(0);
        }}
      />

      <TransactionTable transactions={transactions} />

      <TransactionsPagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
      />
    </div>
  );
}
