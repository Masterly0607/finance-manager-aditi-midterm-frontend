"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft, CheckCircle2 } from "lucide-react";
import type { Account, Transaction } from "@/lib/types";
import { CreateTransferRequest } from "@/lib/types/transfer/tranfer.types";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

interface TransferFormProps {
  accounts: Account[];
  onTransfer: (data: CreateTransferRequest) => void;
  isLoading?: boolean;
}

export function TransferForm({ accounts, onTransfer, isLoading }: TransferFormProps) {
  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!fromId || !toId || fromId === toId || !amount) return;

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) return;

    const payload: CreateTransferRequest = {
      fromAccountId: Number(fromId),
      toAccountId: Number(toId),
      amount: numericAmount,
      note: note.trim() || "Transfer",
    };
    onTransfer(payload);
  }

  const availableTo = accounts.filter((a) => a.id !== fromId);
  const availableFrom = accounts.filter((a) => a.id !== toId);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <ArrowRightLeft className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">New Transfer</CardTitle>
            <CardDescription>Move funds between your accounts.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-md bg-success/10 p-3 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" />
            Transfer completed successfully!
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label>From Account</Label>
              <Select value={fromId} onValueChange={setFromId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {availableFrom.map((a) => (
                    <SelectItem key={a.id} value={String(a.id)}>
                      {a.name} ({formatCurrency(a.balance)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>To Account</Label>
              <Select value={toId} onValueChange={setToId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {availableTo.map((a) => (
                    <SelectItem key={a.id} value={String(a.id)}>
                      {a.name} ({formatCurrency(a.balance)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Label>Note</Label>
              <Input
                placeholder="e.g. Monthly savings transfer"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!fromId || !toId || fromId === toId || !amount || isLoading}
          >
            {isLoading ? "Processing..." : "Transfer Funds"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
