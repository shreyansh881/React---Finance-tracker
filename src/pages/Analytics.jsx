import { useState } from 'react';
import useTransactions from '../hooks/useTransactions';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function Analytics() {
  const { totalIncome, totalExpense, categoryData } = useTransactions();
  const [hoveredChart, setHoveredChart] = useState(null);

  const categoryExpenses = categoryData.map((item) => ({
    category: item.name,
    value: item.value,
  })).sort((a, b) => b.value - a.value);

  const incomeVsExpense = [
    {
      name: 'Income',
      value: totalIncome,
      fill: '#10b981',
    },
    {
      name: 'Expense',
      value: totalExpense,
      fill: '#ef4444',
    },
  ];

  const netAmount = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netAmount / totalIncome) * 100).toFixed(1) : 0;

  const StatCard = ({ icon, label, value, color }) => (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        flex: 1,
        minWidth: '140px',
        transition: 'all 0.3s ease',
        transform: hoveredChart === label ? 'translateY(-5px)' : 'translateY(0)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHoveredChart(label)}
      onMouseLeave={() => setHoveredChart(null)}
    >
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 700, color }}>
        ₹{typeof value === 'number' ? value.toFixed(2) : value}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '32px', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: '#ffffff',
        padding: '32px 24px',
        borderRadius: '16px',
        marginBottom: '32px',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>📊 Analytics</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>Track your income, expenses, and insights</p>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}>
        <StatCard icon="💚" label="Total Income" value={totalIncome} color="#10b981" />
        <StatCard icon="💔" label="Total Expense" value={totalExpense} color="#ef4444" />
        <StatCard 
          icon={netAmount >= 0 ? "🎉" : "⚠️"} 
          label="Net Amount" 
          value={netAmount}
          color={netAmount >= 0 ? "#10b981" : "#ef4444"}
        />
        <StatCard icon="📈" label="Savings Rate" value={`${savingsRate}%`} color="#6366f1" />
      </div>

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Income vs Expense Chart */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            transform: hoveredChart === 'income-expense' ? 'translateY(-5px)' : 'translateY(0)',
          }}
          onMouseEnter={() => setHoveredChart('income-expense')}
          onMouseLeave={() => setHoveredChart(null)}
        >
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            💰 Income vs Expense
          </h2>
          {incomeVsExpense.some((item) => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeVsExpense}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value }) => `${name}: ₹${value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeVsExpense.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#94a3b8',
            }}>
              📭 No data to display
            </div>
          )}
        </div>

        {/* Expenses by Category Chart */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            transform: hoveredChart === 'category-expenses' ? 'translateY(-5px)' : 'translateY(0)',
          }}
          onMouseEnter={() => setHoveredChart('category-expenses')}
          onMouseLeave={() => setHoveredChart(null)}
        >
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            📂 Expenses by Category
          </h2>
          {categoryExpenses.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={categoryExpenses}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />
                <XAxis 
                  dataKey="category"
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => `₹${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#6366f1" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={500}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#94a3b8',
            }}>
              📭 No expenses to display
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown Table */}
      {categoryExpenses.length > 0 && (
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            🎯 Category Breakdown
          </h2>
          <div style={{
            display: 'grid',
            gap: '8px',
          }}>
            {categoryExpenses.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  borderLeft: `4px solid #6366f1`,
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1e293b',
                }}>
                  {item.category}
                </div>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#ef4444',
                }}>
                  ₹{item.value.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}