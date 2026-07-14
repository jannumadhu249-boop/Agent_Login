import { useState } from 'react';
import styles from '../styles/Page.module.css';

export default function TransactionHistoryPage() {
  const [transactions] = useState([
    { 
      id: 1, 
      date: '13 Jul 2026',
      type: 'Credit',
      amount: '50000',
      description: 'Commission Payment - Home Loan',
      referenceId: 'TXN123456789',
      status: 'COMPLETED',
      color: '#10b981'
    },
    { 
      id: 2, 
      date: '10 Jul 2026',
      type: 'Debit',
      amount: '15000',
      description: 'Withdrawal to Bank Account',
      referenceId: 'TXN123456788',
      status: 'COMPLETED',
      color: '#ef4444'
    },
    { 
      id: 3, 
      date: '08 Jul 2026',
      type: 'Credit',
      amount: '30000',
      description: 'Commission Payment - Personal Loan',
      referenceId: 'TXN123456787',
      status: 'COMPLETED',
      color: '#10b981'
    },
    { 
      id: 4, 
      date: '05 Jul 2026',
      type: 'Debit',
      amount: '10000',
      description: 'Withdrawal Request',
      referenceId: 'TXN123456786',
      status: 'PENDING',
      color: '#f59e0b'
    },
  ]);

  const statusColors = {
    COMPLETED: { bg: '#d1fae5', color: '#10b981' },
    PENDING: { bg: '#fef3c7', color: '#f59e0b' },
    FAILED: { bg: '#fee2e2', color: '#ef4444' },
  };

  const calculateBalance = () => {
    const balance = transactions.reduce((acc, txn) => {
      if (txn.status === 'COMPLETED') {
        return acc + (txn.type === 'Credit' ? parseInt(txn.amount) : -parseInt(txn.amount));
      }
      return acc;
    }, 0);
    return balance;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.headerTitle}>Transaction History</h3>
          <p className={styles.headerSubtitle}>All your wallet transactions</p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.headerPill}>
            Balance: ₹{calculateBalance().toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className={styles.card}>
        {/* Search Bar */}
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
              placeholder="Search transactions..."
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
                <th className={styles.th}>TYPE</th>
                <th className={styles.th}>DESCRIPTION</th>
                <th className={styles.th}>REFERENCE ID</th>
                <th className={styles.th}>AMOUNT</th>
                <th className={styles.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.serialNumber}>{index + 1}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 600, color: '#334155' }}>{item.date}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.customerCell}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{item.type}</span>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>{item.description}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#64748b' }}>
                      {item.referenceId}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ 
                      fontWeight: 700, 
                      color: item.type === 'Credit' ? '#10b981' : '#ef4444',
                      fontSize: '15px' 
                    }}>
                      {item.type === 'Credit' ? '+' : '-'}₹{parseInt(item.amount).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={styles.statusBadgeTable}
                      style={{
                        background: statusColors[item.status].bg,
                        color: statusColors[item.status].color,
                      }}
                    >
                      {item.status}
                    </span>
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
