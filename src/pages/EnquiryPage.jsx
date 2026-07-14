import { useState } from 'react';
import styles from '../styles/Page.module.css';
import CreateEnquiry from './CreateEnquiry';
import EditEnquiry from './EditEnquiry';

export default function EnquiryPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [enquiries, setEnquiries] = useState([
    { 
      id: 1, 
      accountManager: 'Rajesh Kumar',
      mobileNumber: '+91 98765 43210',
      name: 'Nisha Patel',
      productType: 'Home Loan',
      requiredLoanAmount: '5000000',
      alternativePhone: '+91 98765 43211',
      dateOfBirth: '1990-05-15',
      email: 'nisha@example.com',
      panNumber: 'ABCDE1234F',
      employeeType: 'Salaried',
      status: 'NEW',
      color: '#3b82f6'
    },
    { 
      id: 2, 
      accountManager: 'Priya Sharma',
      mobileNumber: '+91 91234 56789',
      name: 'Karan Shah',
      productType: 'Personal Loan',
      requiredLoanAmount: '500000',
      alternativePhone: '+91 91234 56790',
      dateOfBirth: '1985-08-20',
      email: 'karan@example.com',
      panNumber: 'FGHIJ5678K',
      employeeType: 'Self Employed',
      status: 'CONTACTED',
      color: '#10b981'
    },
    { 
      id: 3, 
      accountManager: 'Amit Singh',
      mobileNumber: '+91 99887 77665',
      name: 'Priya Menon',
      productType: 'Business Loan',
      requiredLoanAmount: '2000000',
      alternativePhone: '+91 99887 77666',
      dateOfBirth: '1992-03-10',
      email: 'priya.m@example.com',
      panNumber: 'LMNOP9012Q',
      employeeType: 'Business Owner',
      status: 'QUALIFIED',
      color: '#f59e0b'
    },
  ]);

  const statusColors = {
    NEW: { bg: '#dbeafe', color: '#3b82f6' },
    CONTACTED: { bg: '#d1fae5', color: '#10b981' },
    QUALIFIED: { bg: '#fef3c7', color: '#f59e0b' },
  };

  const handleSaveEnquiry = (newEnquiry) => {
    const enquiryWithId = {
      ...newEnquiry,
      id: enquiries.length + 1,
      status: 'NEW',
      color: '#3b82f6'
    };
    setEnquiries([...enquiries, enquiryWithId]);
  };

  const handleUpdateEnquiry = (id, updatedData) => {
    setEnquiries(enquiries.map(enq => enq.id === id ? { ...enq, ...updatedData } : enq));
  };

  const handleDeleteEnquiry = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(enquiries.filter(enq => enq.id !== id));
      alert('Enquiry deleted successfully!');
    }
  };

  const handleEditClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEditModal(true);
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      // Simulate file import
      alert(`File "${file.name}" ready to import. Processing...`);
      // Here you would typically parse CSV/Excel and add to enquiries
      setShowImportModal(false);
      setImportFile(null);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>All Enquiries</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className={styles.addButton} onClick={() => setShowCreateModal(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New Enquiry
          </button>
          <button 
            className={styles.addButton} 
            onClick={() => setShowImportModal(true)}
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Import
          </button>
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
              placeholder="Search enquiries..."
              className={styles.searchInput}
              onChange={(e) => {
                // Search functionality placeholder
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
                <th className={styles.th}>CUSTOMER</th>
                <th className={styles.th}>PHONE</th>
                <th className={styles.th}>PRODUCT TYPE</th>
                <th className={styles.th}>LOAN AMOUNT</th>
                <th className={styles.th}>STATUS</th>
                <th className={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item, index) => (
                <tr key={item.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.serialNumber}>{index + 1}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.customerCell}>
                      <div>
                        <div className={styles.customerName}>{item.name}</div>
                        <div className={styles.customerEmail}>{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.phoneText}>{item.mobileNumber}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 500, color: '#334155' }}>{item.productType}</span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 700, color: '#10b981', fontSize: '15px' }}>
                      ₹{parseInt(item.requiredLoanAmount).toLocaleString('en-IN')}
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
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button 
                        className={styles.actionButton} 
                        title="Edit"
                        onClick={() => handleEditClick(item)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button 
                        className={styles.actionButton} 
                        title="Delete"
                        onClick={() => handleDeleteEnquiry(item.id)}
                        style={{ color: '#ef4444' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateEnquiry
          onClose={() => setShowCreateModal(false)}
          onSave={handleSaveEnquiry}
        />
      )}
      {showEditModal && selectedEnquiry && (
        <EditEnquiry
          enquiry={selectedEnquiry}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEnquiry(null);
          }}
          onUpdate={handleUpdateEnquiry}
        />
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setShowImportModal(false);
                setImportFile(null);
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#64748b',
                lineHeight: 1
              }}
            >
              ×
            </button>

            <h2 style={{
              fontSize: '24px',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '8px'
            }}>
              Import Enquiries
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '32px'
            }}>
              Upload a CSV or Excel file containing enquiry data
            </p>

            <div style={{
              border: '2px dashed #e2e8f0',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              background: '#f8fafc',
              marginBottom: '24px'
            }}>
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#64748b" 
                strokeWidth="2"
                style={{ margin: '0 auto 16px' }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                Drag and drop your file here, or click to browse
              </p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleImportFile}
                style={{ display: 'none' }}
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Choose File
              </label>
            </div>

            <p style={{
              fontSize: '12px',
              color: '#94a3b8',
              textAlign: 'center'
            }}>
              Supported formats: CSV, Excel (.xlsx, .xls)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
