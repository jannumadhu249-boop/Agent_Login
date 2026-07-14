import { useState } from 'react';
import styles from '../styles/Page.module.css';
import modalStyles from '../styles/Modal.module.css';

export default function ViewLeadPage({ leadData, onBack }) {
  const [activeTab, setActiveTab] = useState('details');
  const [comment, setComment] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    role: '',
    assignTo: '',
    description: '',
    dueDate: '',
    priority: 'Medium'
  });
  const [comments, setComments] = useState([
    { 
      id: 1, 
      user: 'Agent', 
      text: 'Lead assigned', 
      date: '09 Jul, 07:05 PM' 
    }
  ]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Follow up',
      status: 'Pending',
      allocatedBy: 'admin',
      assignTo: 'LAXMAN Royal Blue',
      date: 'Dec 29 Jul 2025',
      priority: 'High'
    },
    {
      id: 2,
      title: 'test',
      status: 'Completed',
      allocatedBy: 'admin',
      assignTo: 'LAXMAN Royal Blue',
      date: 'Dec 17 Jul 2025',
      priority: 'Medium'
    }
  ]);

  const handleSendComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: 'Agent',
          text: comment,
          date: new Date().toLocaleString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
          })
        }
      ]);
      setComment('');
    }
  };

  const handleCreateTask = () => {
    if (taskForm.title.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: taskForm.title,
          status: 'Pending',
          allocatedBy: 'admin',
          assignTo: taskForm.assignTo,
          date: new Date(taskForm.dueDate).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          priority: taskForm.priority,
          description: taskForm.description,
          role: taskForm.role
        }
      ]);
      setTaskForm({
        title: '',
        role: '',
        assignTo: '',
        description: '',
        dueDate: '',
        priority: 'Medium'
      });
      setShowTaskModal(false);
    }
  };

  const handleTaskFormChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              color: '#64748b'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h3 className={styles.headerTitle}>
              {leadData.id} - {leadData.name}
            </h3>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '13px', color: '#64748b', alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {leadData.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {leadData.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {new Date(leadData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
              <span style={{ 
                padding: '4px 10px', 
                borderRadius: '4px', 
                background: '#dbeafe', 
                color: '#2563eb',
                fontWeight: 600,
                fontSize: '12px'
              }}>
                {leadData.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
        {/* Main Content */}
        <div>
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            borderBottom: '2px solid #e2e8f0',
            marginBottom: '24px'
          }}>
            {[
            { name: 'details', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/></svg> },
            { name: 'documents', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
            { name: 'lender', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
            { name: 'verification', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> }
          ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.name ? '3px solid #667eea' : '3px solid transparent',
                  color: activeTab === tab.name ? '#667eea' : '#64748b',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  marginBottom: '-2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className={styles.card}>
              {/* Primary Applicant */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Primary Applicant
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Name</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.name || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Date of Birth</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.dateOfBirth || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Email</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.email || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Mobile No</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.phone || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>PAN No</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.panNo || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Aadhar No</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.aadharNo || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Gender</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.gender || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Occupation</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.occupation || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Company Type</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.companyType || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Company / Business Name</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.companyName || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Address Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Current Residence Type</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.currentResidenceType || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Address Line1</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.addressLine1 || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Address Line 2</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.addressLine2 || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>City</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.city || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Pincode</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.pincode || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>State</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.state || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Income Details */}
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Income Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Loan EMI / Obligations</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>₹{leadData.loanEMI || '0'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Net Monthly Income / Profit</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>₹{leadData.netMonthlyIncome || '0'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Annual Turnover / Gross Salary</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>₹{leadData.annualTurnover || leadData.averageGrossSalary || '0'}</div>
                  </div>
                </div>
              </div>

              {/* Office Address Details */}
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  Office Address Details
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Address Line1</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.officeAddressLine1 || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Address Line 2</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.officeAddressLine2 || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>City</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.officeCity || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>State</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.officeState || '-'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>Pincode</div>
                    <div style={{ fontSize: '14px', color: '#0f172a', fontWeight: 500 }}>{leadData.officePincode || '-'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className={styles.card} style={{ padding: '40px', textAlign: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <p style={{ color: '#64748b', fontSize: '15px' }}>No documents uploaded yet</p>
            </div>
          )}

          {/* Lender Tab */}
          {activeTab === 'lender' && (
            <div className={styles.card} style={{ padding: '40px', textAlign: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <p style={{ color: '#64748b', fontSize: '15px' }}>No lender assigned yet</p>
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <div className={styles.card} style={{ padding: '40px', textAlign: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" style={{ margin: '0 auto 16px' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p style={{ color: '#64748b', fontSize: '15px' }}>No verification data available</p>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Comments */}
          <div className={styles.card}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Comments</h4>
            </div>
            <div style={{ padding: '20px', maxHeight: '250px', overflowY: 'auto' }}>
              {comments.map((c) => (
                <div key={c.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{c.user}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{c.date}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>{c.text}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '13px',
                  resize: 'vertical',
                  minHeight: '80px',
                  fontFamily: 'inherit'
                }}
              />
              <button
                onClick={handleSendComment}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '10px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#10b981',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Comment
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className={styles.card}>
            <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Task</h4>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Add Task
                </button>
              </div>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 80px 80px 40px', gap: '12px', fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase' }}>
                <div>#</div>
                <div>Title</div>
                <div>Allocated By</div>
                <div>Assign To</div>
                <div>Action</div>
              </div>
              {tasks.map((task, index) => (
                <div key={task.id} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 80px 80px 40px', gap: '12px', padding: '12px 0', borderTop: '1px solid #e2e8f0', fontSize: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#64748b' }}>{index + 1}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>{task.title}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{task.date}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{task.allocatedBy}</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{task.assignTo}</div>
                  <div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: task.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                      color: task.status === 'Completed' ? '#16a34a' : '#d97706',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '2px'
                    }}>
                      {task.status === 'Completed' ? (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className={modalStyles.modalOverlay} onClick={() => setShowTaskModal(false)}>
          <div className={modalStyles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', width: '90%' }}>
            <div className={modalStyles.modalHeader}>
              <h3 className={modalStyles.modalTitle}>Add New Task</h3>
              <button 
                onClick={() => setShowTaskModal(false)} 
                className={modalStyles.closeButton}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className={modalStyles.modalBody}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                    Task Title *
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    value={taskForm.title}
                    onChange={handleTaskFormChange}
                    placeholder="Enter task title"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                    Role
                  </label>
                  <input 
                    type="text" 
                    name="role"
                    value={taskForm.role}
                    onChange={handleTaskFormChange}
                    placeholder="Enter role"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                    Assign To *
                  </label>
                  <input 
                    type="text" 
                    name="assignTo"
                    value={taskForm.assignTo}
                    onChange={handleTaskFormChange}
                    placeholder="Enter assignee name"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                    Task Description
                  </label>
                  <textarea 
                    name="description"
                    value={taskForm.description}
                    onChange={handleTaskFormChange}
                    placeholder="Enter task description"
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '14px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                      Due Date *
                    </label>
                    <input 
                      type="date" 
                      name="dueDate"
                      value={taskForm.dueDate}
                      onChange={handleTaskFormChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                      Priority *
                    </label>
                    <select 
                      name="priority"
                      value={taskForm.priority}
                      onChange={handleTaskFormChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={modalStyles.modalFooter}>
              <button 
                onClick={() => setShowTaskModal(false)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateTask}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
