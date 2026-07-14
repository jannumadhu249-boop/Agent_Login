import { useState } from 'react';
import styles from '../styles/Modal.module.css';

export default function CreateEnquiry({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    accountManager: '',
    mobileNumber: '',
    name: '',
    productType: '',
    requiredLoanAmount: '',
    alternativePhone: '',
    dateOfBirth: '',
    email: '',
    panNumber: '',
    employeeType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    alert('Enquiry created successfully!');
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1100px' }}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Create Enquiry</h2>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalBody}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Account Manager</label>
              <input
                type="text"
                name="accountManager"
                value={formData.accountManager}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter account manager name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter mobile number"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter customer name"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Product Type</label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select product type</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Business Loan">Business Loan</option>
                <option value="Car Loan">Car Loan</option>
                <option value="Education Loan">Education Loan</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Required Loan Amount</label>
              <input
                type="number"
                name="requiredLoanAmount"
                value={formData.requiredLoanAmount}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter loan amount"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Alternative Phone Number</label>
              <input
                type="tel"
                name="alternativePhone"
                value={formData.alternativePhone}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter alternative phone"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter email address"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter PAN number"
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Employee Type</label>
              <select
                name="employeeType"
                value={formData.employeeType}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select employee type</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Create Enquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
