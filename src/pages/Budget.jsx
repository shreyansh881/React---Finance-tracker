import { useFinance } from "../context/FinanceContext";

export default function Budget() {
  const { budget, setBudget, transactions } = useFinance();

  const spent = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const remaining = budget - spent;
  const percentSpent = (spent / budget) * 100;
  const statusColor = percentSpent > 80 ? '#ef4444' : percentSpent > 60 ? '#f59e0b' : '#10b981';

  return (
    <div style={{
      padding: '2.5rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      flex: 1,
    }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 0.5rem 0' }}>💰 Budget Planning</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Set and track your monthly spending limit</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}>
          <label style={{
            display: 'block',
            color: '#1e293b',
            fontWeight: '700',
            marginBottom: '1rem',
            fontSize: '0.95rem',
          }}>
            Monthly Budget (₹)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6366f1';
              e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
          <p style={{ color: '#64748b', margin: '1rem 0 0 0', fontSize: '0.9rem' }}>Update your budget to track spending</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', margin: 0, marginBottom: '1.5rem' }}>Budget Overview</h2>
          <div style={{ display: 'space-y-4' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Spent</span>
                <span style={{ fontWeight: '700', color: '#ef4444' }}>₹{spent.toLocaleString()}</span>
              </div>
              <div style={{ background: '#e2e8f0', borderRadius: '1rem', height: '12px', overflow: 'hidden' }}>
                <div
                  style={{
                    background: statusColor,
                    height: '100%',
                    width: `${Math.min(percentSpent, 100)}%`,
                    borderRadius: '1rem',
                    transition: 'width 0.5s ease',
                  }}
                ></div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>{Math.round(percentSpent)}% of budget spent</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 0.3rem 0' }}>Remaining</p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: remaining >= 0 ? '#10b981' : '#ef4444',
                  margin: 0,
                }}>
                  ₹{remaining.toLocaleString()}
                </p>
              </div>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 0.3rem 0' }}>Budget</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6366f1', margin: 0 }}>
                  ₹{budget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {percentSpent > 80 && (
        <div style={{
          background: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <h3 style={{ color: '#dc2626', fontWeight: '700', margin: 0, marginBottom: '0.3rem' }}>You're close to your budget limit!</h3>
            <p style={{ color: '#991b1b', margin: 0, fontSize: '0.95rem' }}>Consider reducing expenses or increasing your budget</p>
          </div>
        </div>
      )}
    </div>
  );
}