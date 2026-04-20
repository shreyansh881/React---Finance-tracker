import { useFinance } from "../context/FinanceContext";

export default function useTransactions() {
  const { transactions } = useFinance();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      if (t.type === "expense") {
        acc[t.category] = acc[t.category] || {
          name: t.category,
          value: 0,
        };
        acc[t.category].value += t.amount;
      }
      return acc;
    }, {})
  );

  return { totalIncome, totalExpense, categoryData };
}