import { useState } from 'react';
import styles from '../styles/Page.module.css';

export default function DebitWithdrawPage() {
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [requests] = useState([
    { 
      id: 1, 
      date: '13 Jul 2026',
      amount: '25000',
      bankAccount: 'XXXX XXXX XXXX 5678',
      ifscCode: 'SBIN0001234',
      status: 'PENDING',
      color: '#f59e0b'
    },
    { 
      id: 2, 
      date: '10 Jul 2026',
      amount: '15000',
      bankAccount: 'XXXX XXXX XXXX 5678',
      ifscCode: 'SBIN0001234',
      status: 'COMPLETED',
      color: '#10b981'
    },
    { 
      id: 3, 
      date: '05 Jul 2026',
      amount: '20000',
      bankAccount: 'XXXX XXXX XXXX 5678',
      ifscCode: 'SBIN0001234',
      status: 'REJECTED',
      color: '#ef4444'
    },
  ]);

  const statusColors = {
    PENDING: { bg: '#fef3c7', color: '#f59e0b' },
    COMPLETED: { bg: '#d1fae5', color: '#10b981' },
    REJECTED: { bg: '#fee2e2', color: '#ef4444' },
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    alert('Withdrawal request submitted successfully!');
    setShowWithdrawForm(false);
    setAmount('');
    setBankAccount('');
    setIfscCode('');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.headerTitle}>Debit Withdraw Requests</h3>
          <p className={styles.headerSubtitle}>Manage your withdrawal requests</p>
        </div>
        <button 
          className={styles.addButton} 
          onClick={() => setShowWithdrawForm(!showWithdrawForm)}
        >
          + New Withdraw Request
        </button>
      </div>

      {/* Withdraw Form */}
      {showWithdrawForm && (
        <div className={styles.card} style={{ marginBottom: '24px' }}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>New Withdrawal Request</h3>
          </div>
          <form onSubmit={handleSubmitRequest} style={{ padding: '24px' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '20px',
              marginBottom: '24px'
            }}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Amount</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  className={styles.formInput}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Bank Account Number</label>
                <input
                  type="text"
                  placeholder="Enter bank account"
                  className={styles.formInput}
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>IFSC Code</label>
                <input
                  type="text"
                  placeholder="Enter IFSC code"
                  className={styles.formInput}
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  required
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowWithdrawForm(false)}
                style={{
                  padding: '10px 20px',
                  background: '#f1f5f9',
                  color: '#64748b',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.addButton}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Requests Table */}
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <div className={styles.searchWrapper}>
            <svg 
              className={styles.searchIcon}
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m21 21-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search requests..."
              className={styles.searchInput}
              onChange={(e) => {
                console.log('Search:', e.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>SL.NO</th>
                <th className={styles.th}>DATE</th>
                <th className={styles.th}>AMOUNT</th>
                <th className={styles.th}>BANK ACCOUNT</th>
                <th className={styles.th}>IFSC CODE</th>
                <th className={styles.th}>STATUS</th>
                <th className={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((item, index) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.serialNumber}>{index + 1}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{item.date}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 700, color: '#10b981', fontSize: '15px' }}>
                      ₹{parseInt(item.amount).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b' }}>
                      {item.bankAccount}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b' }}>
                      {item.ifscCode}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.customerCell}>
                      <span
                        className={styles.statusBadgeTable}
                        style={{
                          background: statusColors[item.status].bg,
                          color: statusColors[item.status].color,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button 
                        className={styles.actionButton} 
                        title="View Details"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {/* {item.status === 'PENDING' && (
                        <button 
                          className={styles.actionButton} 
                          title="Cancel"
                          style={{ color: '#ef4444' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
