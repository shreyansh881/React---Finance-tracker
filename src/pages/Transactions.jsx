import { useFinance } from "../context/FinanceContext";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function Transactions() {
  const { transactions, deleteTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);

  const filtered = transactions.filter((t) =>
    t.title.toLowerCase().includes(debounced.toLowerCase())
  );

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Food': '🍽️',
      'Travel': '✈️',
      'Rent': '🏠',
      'Entertainment': '🎬',
      'Utilities': '⚡',
      'Other': '📦',
    };
    return emojis[category] || '💳';
  };

  return (
    <div style={{
      padding: '2.5rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      flex: 1,
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 1rem 0' }}>Transactions</h1>
        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search transactions..."
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: '2px solid #e2e8f0',
              borderRadius: '0.75rem',
              fontSize: '1rem',
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
        </div>
      </div>

      {filtered.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((t) => (
            <div
              key={t.id}
              style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                border: `2px solid ${t.type === 'income' ? '#10b981' : '#ef4444'}20`,
                gap: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                <div style={{ fontSize: '1.75rem' }}>{getCategoryEmoji(t.category)}</div>
                <div>
                  <p style={{ fontWeight: '600', color: '#1e293b', margin: '0 0 0.3rem 0' }}>{t.title}</p>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{t.category} • {t.date}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{
                    fontWeight: '700',
                    fontSize: '1.25rem',
                    color: t.type === 'income' ? '#10b981' : '#ef4444',
                    margin: 0,
                  }}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                  </p>
                  {t.recurring && <p style={{ fontSize: '0.8rem', color: '#8b5cf6', margin: '0.3rem 0 0 0', fontWeight: '500' }}>Recurring</p>}
                </div>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#fecaca';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#fee2e2';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '1rem',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <p style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>📭</p>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>No transactions found</p>
        </div>
      )}
    </div>
  );
}