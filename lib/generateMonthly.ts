export function generateMonthlyData(transactions: any[]) {
  const monthlyMap: Record<number, { income: number; expense: number }> = {};

  transactions.forEach((tx) => {
    if (!tx.date) return;

    const [day, month, year] = tx.date.split("/");
    const date = new Date(`${year}-${month}-${day}`);

    if (isNaN(date.getTime())) return;

    const monthIndex = date.getMonth(); // 0 = Jan, 9 = Oct

    if (!monthlyMap[monthIndex]) {
      monthlyMap[monthIndex] = { income: 0, expense: 0 };
    }

    if (tx.type === "INCOME") {
      monthlyMap[monthIndex].income += tx.amount;
    } else {
      monthlyMap[monthIndex].expense += tx.amount;
    }
  });

  return Object.entries(monthlyMap)
    .map(([monthIndex, values]) => {
      const date = new Date(2025, Number(monthIndex)); // year doesn't matter
      return {
        month: date.toLocaleString("en-US", { month: "short" }), // Jan, Feb, Oct
        income: values.income,
        expense: values.expense,
      };
    })
    .sort((a, b) => {
      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
}
