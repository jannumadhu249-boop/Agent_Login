import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Page.module.css';

const defaultFilters = {
  product: '',
  status: '',
  startDate: '',
  endDate: '',
};

const productOptions = ['Home Loan', 'Personal Loan', 'Car Loan', 'Insurance', 'Real Estate'];
const statusOptions = [
  'Lead Generated',
  'Details Pending',
  'Lender Selection',
  'To be Login',
  'Login',
  'Sanction',
  'Disbursement',
  'Completed',
  'Rejected',
];

export default function LeadFilterPanel({ isOpen, onClose, filters, onApply, onReset }) {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filters);
    }
  }, [isOpen, filters]);

  const isDirty = useMemo(() => {
    return Object.entries(draftFilters).some(([key, value]) => value !== defaultFilters[key]);
  }, [draftFilters]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setDraftFilters(defaultFilters);
    onReset(defaultFilters);
    onClose();
  };

  const handleApply = () => {
    onApply(draftFilters);
    onClose();
  };

  return (
    <div className={styles.filterOverlay} onClick={onClose}>
      <div className={styles.filterPanel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.filterHeader}>
          <div>
            <h4 className={styles.filterTitle}>Filter Leads</h4>
            <p className={styles.filterSubtitle}>Refine leads by product, status, or date range.</p>
          </div>
          <button className={styles.filterCloseButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className={styles.filterGrid}>
          <label className={styles.filterField}>
            <span className={styles.filterLabel}>Product</span>
            <select
              className={styles.filterSelect}
              value={draftFilters.product}
              onChange={(event) => handleChange('product', event.target.value)}
            >
              <option value="">All Products</option>
              {productOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.filterField}>
            <span className={styles.filterLabel}>Status</span>
            <select
              className={styles.filterSelect}
              value={draftFilters.status}
              onChange={(event) => handleChange('status', event.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.filterField}>
            <span className={styles.filterLabel}>Start Date</span>
            <input
              type="date"
              className={styles.filterInput}
              value={draftFilters.startDate}
              onChange={(event) => handleChange('startDate', event.target.value)}
            />
          </label>

          <label className={styles.filterField}>
            <span className={styles.filterLabel}>End Date</span>
            <input
              type="date"
              className={styles.filterInput}
              value={draftFilters.endDate}
              onChange={(event) => handleChange('endDate', event.target.value)}
            />
          </label>
        </div>

        <div className={styles.filterActions}>
          <button className={styles.filterSecondaryButton} onClick={handleReset} type="button">
            Clear
          </button>
          <button className={styles.filterPrimaryButton} onClick={handleApply} type="button" disabled={!isDirty}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
