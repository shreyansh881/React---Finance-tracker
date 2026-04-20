import { useForm } from "react-hook-form";
import { useFinance } from "../context/FinanceContext";
import { toast } from "react-toastify";

export default function AddTransaction() {
  const { register, handleSubmit, reset } = useForm();
  const { addTransaction } = useFinance();

  const onSubmit = (data) => {
    if (!data.title || !data.amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    addTransaction({
      ...data,
      amount: Number(data.amount),
      recurring: data.recurring || false,
    });
    toast.success("✅ Transaction added successfully!");
    reset();
  };

  const FormField = ({ label, children, required = false }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{
        display: 'block',
        color: '#1e293b',
        fontWeight: '600',
        marginBottom: '0.5rem',
        fontSize: '0.95rem',
      }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      {children}
    </div>
  );

  const Input = (props) => (
    <input
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '2px solid #e2e8f0',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
        fontFamily: 'inherit',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#6366f1';
        e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#e2e8f0';
        e.target.style.boxShadow = 'none';
      }}
      {...props}
    />
  );

  const Select = (props) => (
    <select
      style={{
        width: '100%',
        padding: '0.75rem 1rem',
        border: '2px solid #e2e8f0',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#6366f1';
        e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)';
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#e2e8f0';
        e.target.style.boxShadow = 'none';
      }}
      {...props}
    />
  );

  return (
    <div style={{
      padding: '2.5rem 2rem',
      maxWidth: '600px',
      margin: '0 auto',
      width: '100%',
      flex: 1,
    }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Add Transaction</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>Record a new income or expense</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      }}>
        <FormField label="Transaction Title" required={true}>
          <Input {...register("title", { required: true })} placeholder="e.g., Grocery shopping" />
        </FormField>

        <FormField label="Amount (₹)" required={true}>
          <Input {...register("amount", { required: true })} placeholder="0.00" type="number" step="0.01" />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <FormField label="Type" required={true}>
            <Select {...register("type")}>
              <option value="expense">💔 Expense</option>
              <option value="income">💚 Income</option>
            </Select>
          </FormField>

          <FormField label="Category" required={true}>
            <Select {...register("category")}>
              <option value="">Select category</option>
              <option value="Food">🍽️ Food</option>
              <option value="Travel">✈️ Travel</option>
              <option value="Rent">🏠 Rent</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Utilities">⚡ Utilities</option>
              <option value="Other">📦 Other</option>
            </Select>
          </FormField>
        </div>

        <FormField label="Date">
          <Input type="date" {...register("date")} />
        </FormField>

        <FormField label="Notes">
          <textarea
            {...register("notes")}
            placeholder="Add any additional notes..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              outline: 'none',
              minHeight: '100px',
              fontFamily: 'inherit',
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
        </FormField>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '0.75rem',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            {...register("recurring")}
            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
          />
          <label style={{ cursor: 'pointer', color: '#64748b', fontWeight: '500' }}>
            This is a recurring transaction
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white',
            fontWeight: '700',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(99,102,241,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(99,102,241,0.3)';
          }}
        >
          ✨ Add Transaction
        </button>
      </form>
    </div>
  );
}