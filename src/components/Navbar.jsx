import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/transactions', label: '💳 Transactions' },
    { path: '/transactions/new', label: '➕ Add' },
    { path: '/budget', label: '💰 Budget' },
    { path: '/analytics', label: '📈 Analytics' },
  ];

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '1.5rem 2rem',
      boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.75rem' }}>💰</span>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.5px' }}>FinTrack</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.25)' : 'transparent',
                fontWeight: isActive(item.path) ? '600' : '500',
                fontSize: '0.95rem',
                border: isActive(item.path) ? '1px solid rgba(255,255,255,0.3)' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}