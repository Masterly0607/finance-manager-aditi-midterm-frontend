"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface SummaryData {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  net: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const cards = [
  {
    title: "Total Balance",
    key: "totalBalance" as const,
    icon: DollarSign,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "This Month Income",
    key: "monthIncome" as const,
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    title: "This Month Expense",
    key: "monthExpense" as const,
    icon: TrendingDown,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    title: "Net (Income - Expense)",
    key: "net" as const,
    icon: Activity,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function SummaryCards({ data }: { data: SummaryData }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${card.bg}`}
            >
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(data[card.key])}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
