import styles from '../styles/Page.module.css';

function StatIcon({ type }) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'lead':
      return (
        <svg {...commonProps}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <path d="M17 8l2 2 4-4" />
        </svg>
      );
    case 'pending':
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'lender':
      return (
        <svg {...commonProps}>
          <path d="M3 21h18" />
          <path d="M5 21V9l7-4 7 4v12" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case 'login':
      return (
        <svg {...commonProps}>
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        </svg>
      );
    case 'sanction':
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      );
    case 'disbursement':
      return (
        <svg {...commonProps}>
          <path d="M12 2v20" />
          <path d="M17 7H7" />
          <path d="M17 17H7" />
          <path d="M4 12h16" />
        </svg>
      );
    case 'completed':
      return (
        <svg {...commonProps}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case 'rejected':
      return (
        <svg {...commonProps}>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </svg>
      );
    default:
      return (
        <svg {...commonProps}>
          <path d="M3 12h18" />
          <path d="M12 3v18" />
        </svg>
      );
  }
}

export default function DashboardPage({ onEnquiryViewAll, onLeadsViewAll }) {
  const handleEnquiryViewAll = onEnquiryViewAll || (() => {});
  const handleLeadsViewAll = onLeadsViewAll || (() => {});

  const stats = [
    { title: 'Lead Generated', value: '24', icon: 'lead', gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' },
    { title: 'Details Pending', value: '11', icon: 'pending', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
    { title: 'Lender Selected', value: '8', icon: 'lender', gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' },
    { title: 'To be Login', value: '5', icon: 'login', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' },
    { title: 'Login', value: '7', icon: 'login', gradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)' },
    { title: 'Sanction', value: '12', icon: 'sanction', gradient: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' },
    { title: 'Disbursement', value: '9', icon: 'disbursement', gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' },
    { title: 'Completed', value: '16', icon: 'completed', gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
    { title: 'Rejected', value: '4', icon: 'rejected', gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' },
  ];

  const enquiries = [
    { employee: 'Right Agent Group', dialed: 38, duration: '1h 12m', converted: 12, uncontacted: 5 },
    { employee: 'Ramesh Kumar', dialed: 24, duration: '45m', converted: 8, uncontacted: 3 },
    { employee: 'Priya Sharma', dialed: 19, duration: '32m', converted: 6, uncontacted: 2 },
  ];

  const leads = [
    { applicant: 'Asha Singh', product: 'Home Loan', amount: '₹25,00,000', manager: 'Ravi', status: 'Lead Generated', date: '13 Jul 2026' },
    { applicant: 'Rahul Verma', product: 'Car Loan', amount: '₹8,50,000', manager: 'Neha', status: 'Details Pending', date: '12 Jul 2026' },
    { applicant: 'Nina Rao', product: 'Personal Loan', amount: '₹3,20,000', manager: 'Arjun', status: 'Login', date: '11 Jul 2026' },
    { applicant: 'Arjun Mehta', product: 'Business Loan', amount: '₹14,00,000', manager: 'Kavya', status: 'Completed', date: '10 Jul 2026' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.dashboardShell}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.headerTitle}>Agent Dashboard</h2>
            <p className={styles.headerSubtitle}>Right Agent Group • Welcome back</p>
          </div>
          <span className={styles.headerPill}>Live overview</span>
        </div>

        {/* First Row - 5 Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '18px',
          marginBottom: '24px'
        }}>
          {stats.slice(0, 5).map((item) => (
            <div key={item.title} className={styles.statCard} style={{ background: item.gradient }}>
              <div className={styles.statIcon}>
                <StatIcon type={item.icon} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{item.value}</h3>
                <p className={styles.statLabel}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 4 Cards aligned with first row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(5, 1fr)', 
          gap: '18px',
          marginBottom: '32px'
        }}>
          {stats.slice(5, 9).map((item) => (
            <div key={item.title} className={styles.statCard} style={{ background: item.gradient }}>
              <div className={styles.statIcon}>
                <StatIcon type={item.icon} />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statValue}>{item.value}</h3>
                <p className={styles.statLabel}>{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>Enquiries Count</h3>
                <p className={styles.cardSubtitle}>Lead follow-up performance at a glance</p>
              </div>
              <div className={styles.cardHeaderActions}>
                <span className={styles.headerPill}>3 Team members</span>
                <button className={styles.viewAllButton} onClick={handleEnquiryViewAll}>
                  View All →
                </button>
              </div>
            </div>

            <div className={styles.miniStatsRow}>
              <div className={styles.miniStatCard}>
                <span className={styles.miniStatLabel}>Total Dialed</span>
                <strong className={styles.miniStatValue}>81</strong>
              </div>
              <div className={styles.miniStatCard}>
                <span className={styles.miniStatLabel}>Converted</span>
                <strong className={styles.miniStatValue}>26</strong>
              </div>
              <div className={styles.miniStatCard}>
                <span className={styles.miniStatLabel}>Uncontacted</span>
                <strong className={styles.miniStatValue}>10</strong>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.modernTable}>
                <thead>
                  <tr>
                    <th className={styles.th}>SL.NO</th>
                    <th className={styles.th}>Employee</th>
                    <th className={styles.th}>Dialed</th>
                    <th className={styles.th}>Duration</th>
                    <th className={styles.th}>Converted</th>
                    <th className={styles.th}>Uncontacted</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.serialNumber}>{index + 1}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.customerCell}>
                          <div className={styles.avatarChip}>{item.employee.charAt(0)}</div>
                          <span className={styles.customerName}>{item.employee}</span>
                        </div>
                      </td>
                      <td className={styles.td}><span className={styles.tablePill}>{item.dialed}</span></td>
                      <td className={styles.td}>{item.duration}</td>
                      <td className={styles.td}><span className={styles.tablePillSuccess}>{item.converted}</span></td>
                      <td className={styles.td}><span className={styles.tablePillWarning}>{item.uncontacted}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.cardTitle}>My Leads</h3>
                <p className={styles.cardSubtitle}>A polished snapshot of the latest loan leads</p>
              </div>
              <div className={styles.cardHeaderActions}>
                <span className={styles.headerPill}>4 Leads</span>
                <button className={styles.viewAllButton} onClick={handleLeadsViewAll}>
                  View All →
                </button>
              </div>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.modernTable}>
                <thead>
                  <tr>
                    <th className={styles.th}>SL.NO</th>
                    <th className={styles.th}>Applicant</th>
                    <th className={styles.th}>Product</th>
                    <th className={styles.th}>Amount</th>
                    <th className={styles.th}>Manager</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}>
                        <span className={styles.serialNumber}>{index + 1}</span>
                      </td>
                      <td className={styles.td}>
                        <div className={styles.customerCell}>
                          <div className={styles.avatarChip}>{lead.applicant.charAt(0)}</div>
                          <span className={styles.customerName}>{lead.applicant}</span>
                        </div>
                      </td>
                      <td className={styles.td}>{lead.product}</td>
                      <td className={styles.td}><span className={styles.amountText}>{lead.amount}</span></td>
                      <td className={styles.td}>{lead.manager}</td>
                      <td className={styles.td}><span className={styles.statusBadge}>{lead.status}</span></td>
                      <td className={styles.td}>{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
