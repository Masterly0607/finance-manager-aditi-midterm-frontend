"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransferForm } from "@/components/transfer-form";

import { useTransfer } from "@/lib/hooks/transactions/useTransfer";
import { useAccounts, useTransactions } from "@/lib/hooks/transactions/useTransactions";
import { CreateTransferRequest } from "@/lib/types/transfer/tranfer.types";

export default function TransferPage() {
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();

  const { data: transactionsData, isLoading: transactionsLoading } = useTransactions({
    account: "all",
    type: "all",
    search: "",
    page: 0,
    pageSize: 8,
  });

  const { mutate, isPending, isSuccess, isError, error } = useTransfer();
  const accountMap = new Map(accounts.map((a) => [String(a.id), a.name]));

  const enrichedTransactions =
    transactionsData?.transactions.map((txn) => {
      let fromAccountName: string | undefined;
      let toAccountName: string | undefined;

      const originalNote = txn.note ?? "";
      let updatedNote = originalNote;

      if (txn.type === "TRANSFER") {
        const ids = originalNote.match(/\d+/g) ?? [];

        if (ids.length >= 2) {
          const fromId = ids[0]!;
          const toId = ids[1]!;

          fromAccountName = accountMap.get(fromId);
          toAccountName = accountMap.get(toId);

          updatedNote = originalNote.replace(/\d+/g, (id) => accountMap.get(id) ?? id);
        }
      }

      return {
        ...txn,
        accountName: accountMap.get(String(txn.accountId)) ?? "Unknown",
        fromAccountName,
        toAccountName,
        note: updatedNote,
      };
    }) ?? [];

  function handleTransfer(data: CreateTransferRequest) {
    mutate(data);
  }

  if (accountsLoading || transactionsLoading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Transfer</h1>
        <p className="text-sm text-muted-foreground">Transfer funds between your accounts.</p>
      </div>

      <div className="flex flex-col gap-6">
        <TransferForm accounts={accounts} onTransfer={handleTransfer} isLoading={isPending} />

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Transfers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TransactionTable
              transactions={enrichedTransactions.filter((tx) => tx.type === "TRANSFER")}
            />
          </CardContent>
        </Card>
      </div>

      {isError && <p className="text-red-500 text-sm">Something went wrong: {error?.message}</p>}

      {isSuccess && <p className="text-green-500 text-sm">Transfer successful!</p>}
    </div>
  );
}
