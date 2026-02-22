"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/lib/types/transactions/transaction.types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function typeBadgeVariant(type: string) {
  switch (type) {
    case "INCOME":
      return "default" as const;
    case "EXPENSE":
      return "destructive" as const;
    case "TRANSFER":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

interface TransactionTableProps {
  transactions: Transaction[];
  showUser?: boolean;
  showAccount?: boolean;
}

export function TransactionTable({
  transactions,
  showUser = false,
  showAccount = true,
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
        <p className="text-sm text-muted-foreground">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            {showUser && <TableHead>User</TableHead>}
            {showAccount && <TableHead>Account</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell className="text-muted-foreground">{txn.transactionDate}</TableCell>
              {showUser && <TableCell className="text-muted-foreground">{txn.userEmail}</TableCell>}
              {showAccount && (
                <TableCell className="font-medium text-foreground">
                  {txn.type === "TRANSFER"
                    ? `${txn.fromAccountName} -> ${txn.toAccountName}`
                    : txn.accountName}
                </TableCell>
              )}
              <TableCell>
                <Badge variant={typeBadgeVariant(txn.type)}>{txn.type}</Badge>
              </TableCell>
              <TableCell
                className={`text-right font-medium ${
                  txn.type === "INCOME"
                    ? "text-success"
                    : txn.type === "EXPENSE"
                      ? "text-destructive"
                      : "text-foreground"
                }`}
              >
                {txn.type === "INCOME" ? "+" : txn.type === "EXPENSE" ? "-" : ""}
                {formatCurrency(txn.amount)}
              </TableCell>
              <TableCell className="text-muted-foreground">{txn.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
