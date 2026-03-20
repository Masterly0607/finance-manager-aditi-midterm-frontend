export function generateMonthlyData(transactions: any[]) {
  const monthlyMap: Record<number, { income: number; expense: number }> = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.transactionDate || tx.date);
    if (isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();

    if (!monthlyMap[monthIndex]) {
      monthlyMap[monthIndex] = { income: 0, expense: 0 };
    }

    const amount = Number(tx.amount) || 0;

    const type = tx.transactionType?.toUpperCase() || tx.type?.toUpperCase();

    if (type === "INCOME") {
      monthlyMap[monthIndex].income += amount;
    } else if (type === "EXPENSE") {
      monthlyMap[monthIndex].expense += amount;
    }
  });

  return Object.entries(monthlyMap).map(([monthIndex, values]) => {
    const date = new Date(2026, Number(monthIndex));

    return {
      month: date.toLocaleString("en-US", { month: "short" }),
      income: values.income,
      expense: values.expense,
    };
  });
}
