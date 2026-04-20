export default function TransactionCard({ t, onDelete }) {
    return (
      <div>
        <p>{t.title} - ₹{t.amount}</p>
        <p>{t.notes}</p>
        <button onClick={() => onDelete(t.id)}>Delete</button>
      </div>
    );
  }