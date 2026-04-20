import useTransactions from "../hooks/useTransactions";

export default function Dashboard() {
  const { totalIncome, totalExpense } = useTransactions();
  const balance = totalIncome - totalExpense;

  const StatCard = ({ icon, label, value, color, trend }) => (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      border: `2px solid ${color}20`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ fontSize: '2.5rem' }}>{icon}</div>
        {trend && <span style={{ fontSize: '0.85rem', color: color, fontWeight: '600', background: `${color}15`, padding: '0.3rem 0.6rem', borderRadius: '0.3rem' }}>{trend}</span>}
      </div>
      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 0.5rem 0', fontWeight: '500' }}>{label}</p>
      <h3 style={{ fontSize: '2.2rem', fontWeight: '700', color: color, margin: 0 }}>₹{value.toLocaleString()}</h3>
    </div>
  );

  return (
    <div style={{
      padding: '2.5rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      width: '100%',
      flex: 1,
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', margin: '0 0 0.5rem 0' }}>Welcome back!</h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>Here's your financial overview</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
      }}>
        <StatCard
          icon="💚"
          label="Total Income"
          value={totalIncome}
          color="#10b981"
          trend="+12.5%"
        />
        <StatCard
          icon="💔"
          label="Total Expense"
          value={totalExpense}
          color="#ef4444"
          trend="+5.2%"
        />
        <StatCard
          icon={balance >= 0 ? "🎉" : "⚠️"}
          label="Balance"
          value={balance}
          color={balance >= 0 ? "#6366f1" : "#f59e0b"}
        />
      </div>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.5rem', margin: 0 }}>Savings Rate</h2>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748b' }}>Savings</span>
            <span style={{ fontWeight: '600', color: '#1e293b' }}>{totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0}%</span>
          </div>
          <div style={{ background: '#e2e8f0', borderRadius: '1rem', height: '8px', overflow: 'hidden' }}>
            <div style={{
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              height: '100%',
              width: `${totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0}%`,
              borderRadius: '1rem',
              transition: 'width 0.5s ease',
            }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}