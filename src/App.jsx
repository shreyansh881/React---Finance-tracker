import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";
import Navbar from "./components/navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </main>
    </>
  );
}