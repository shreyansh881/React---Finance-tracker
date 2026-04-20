import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  });

  const [budget, setBudget] = useState(
    () => Number(localStorage.getItem("budget")) || 50000
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const addTransaction = (data) => {
    setTransactions([...transactions, { ...data, id: uuidv4() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updated) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);