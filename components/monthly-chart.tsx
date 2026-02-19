"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import type { MonthlySummary } from "@/lib/types"

export function MonthlyChart({ data }: { data: MonthlySummary[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground">Income vs Expense by Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(value)
                }
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--card-foreground))",
                }}
              />
              <Legend />
              <Bar
                dataKey="income"
                name="Income"
                fill="hsl(var(--success))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="hsl(var(--destructive))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
