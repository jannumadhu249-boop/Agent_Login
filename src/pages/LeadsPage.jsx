import { useState } from "react";
import LeadFilterPanel from "./LeadFilterPanel";
import CreateLeadPage from "./CreateLeadPage";
import EditLeadPage from "./EditLeadPage";
import ViewLeadPage from "./ViewLeadPage";
import styles from "../styles/Page.module.css";

export default function LeadsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Riya Kapoor",
      email: "riya@example.com",
      phone: "+91 98123 45678",
      status: "Lead Generated",
      amount: "7500000",
      product: "Home loan",
      date: "2026-05-12",
      color: "#ef4444",
    },
    {
      id: 2,
      name: "Sanjay Dutta",
      email: "sanjay@example.com",
      phone: "+91 98234 56789",
      status: "Details Pending",
      amount: "3000000",
      product: "Car loan",
      date: "2026-06-05",
      color: "#f59e0b",
    },
    {
      id: 3,
      name: "Mona Iyer",
      email: "mona@example.com",
      phone: "+91 98345 67890",
      status: "Lender Selection",
      amount: "1500000",
      product: "Personal loan",
      date: "2026-04-18",
      color: "#3b82f6",
    },
    {
      id: 4,
      name: "Amit Sharma",
      email: "amit@example.com",
      phone: "+91 98456 78901",
      status: "Sanction",
      amount: "5000000",
      product: "Insurance",
      date: "2026-03-21",
      color: "#ef4444",
    },
    {
      id: 5,
      name: "Neha Gupta",
      email: "neha@example.com",
      phone: "+91 98567 89012",
      status: "Completed",
      amount: "2500000",
      product: "Real Estate",
      date: "2026-07-01",
      color: "#f59e0b",
    },
    {
      id: 6,
      name: "Raj Kumar",
      email: "raj@example.com",
      phone: "+91 98678 90123",
      status: "Rejected",
      amount: "1000000",
      product: "Home loan",
      date: "2026-02-14",
      color: "#3b82f6",
    },
  ]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    product: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const statusColors = {
    "Lead Generated": { bg: "#e0f2fe", color: "#0369a1" },
    "Details Pending": { bg: "#fef3c7", color: "#d97706" },
    "Lender Selection": { bg: "#ede9fe", color: "#7c3aed" },
    "To be login": { bg: "#fce7f3", color: "#db2777" },
    login: { bg: "#dcfce7", color: "#16a34a" },
    Sanction: { bg: "#dbeafe", color: "#2563eb" },
    Disbursement: { bg: "#ecfccb", color: "#65a30d" },
    Completed: { bg: "#dcfce7", color: "#15803d" },
    Rejected: { bg: "#fee2e2", color: "#dc2626" },
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = !searchQuery || [lead.name, lead.email, lead.phone, lead.product, lead.status]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesProduct = !filters.product || lead.product.toLowerCase() === filters.product.toLowerCase();
    const matchesStatus = !filters.status || lead.status.toLowerCase() === filters.status.toLowerCase();
    const matchesDate = (() => {
      if (!filters.startDate && !filters.endDate) return true;

      const leadDate = lead.date ? new Date(lead.date) : null;
      if (!leadDate) return false;

      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;

      if (start && end) return leadDate >= start && leadDate <= end;
      if (start) return leadDate >= start;
      if (end) return leadDate <= end;
      return true;
    })();

    return matchesSearch && matchesProduct && matchesStatus && matchesDate;
  });

  const handleDeleteLead = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
      alert("Lead deleted successfully!");
    }
  };

  const handleEditLead = (lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleSaveLead = (newLead) => {
    setLeads([newLead, ...leads]);
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
  };

  // If in create mode, show CreateLeadPage full screen
  if (showCreateModal) {
    return (
      <CreateLeadPage
        onBack={() => setShowCreateModal(false)}
        onSave={handleSaveLead}
      />
    );
  }

  // If in edit mode, show EditLeadPage full screen
  if (showEditModal && selectedLead) {
    return (
      <EditLeadPage
        leadData={selectedLead}
        onBack={() => {
          setShowEditModal(false);
          setSelectedLead(null);
        }}
        onSave={handleUpdateLead}
      />
    );
  }

  // If in view mode, show ViewLeadPage full screen
  if (showViewModal && selectedLead) {
    return (
      <ViewLeadPage
        leadData={selectedLead}
        onBack={() => {
          setShowViewModal(false);
          setSelectedLead(null);
        }}
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>All Leads</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          className={styles.addButton}
          onClick={() => setShowCreateModal(true)}
          type="button"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M12 5v14M5 12h14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Lead
        </button>

        <button className={styles.addButton} onClick={() => setIsFilterOpen(true)} type="button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M3 5H21L14 13V19L10 21V13L3 5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter
        </button>
        </div>
      </div>

      <LeadFilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={(nextFilters) => setFilters(nextFilters)}
        onReset={(nextFilters) => setFilters(nextFilters)}
      />

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
              <circle
                cx="11"
                cy="11"
                r="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m21 21-4.35-4.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search leads..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className={styles.th}>STAGE</th>
                <th className={styles.th}>AMOUNT</th>
                <th className={styles.th}>PRODUCT</th>
                <th className={styles.th}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? filteredLeads.map((lead, index) => (
                <tr key={lead.id} className={styles.tr}>
                  <td className={styles.td}>
                    <span className={styles.serialNumber}>{index + 1}</span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.customerCell}>
                      <div>
                        <div className={styles.customerName}>{lead.name}</div>
                        <div className={styles.customerEmail}>{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.phoneText}>{lead.phone}</span>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={styles.statusBadgeTable}
                      style={{
                        background: statusColors[lead.status]?.bg || "#f1f5f9",
                        color: statusColors[lead.status]?.color || "#334155",
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#10b981",
                        fontSize: "15px",
                      }}
                    >
                      ₹{parseInt(lead.amount).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span style={{ fontWeight: 500, color: "#64748b" }}>
                      {lead.product}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button 
                        className={styles.actionButton} 
                        title="View" 
                        onClick={() => handleViewLead(lead)}
                        style={{ color: "#3b82f6" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button 
                        className={styles.actionButton} 
                        title="Edit" 
                        onClick={() => handleEditLead(lead)}
                        style={{ color: "#10b981" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        className={styles.actionButton}
                        title="Delete"
                        onClick={() => handleDeleteLead(lead.id)}
                        style={{ color: "#ef4444" }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline
                            points="3 6 5 6 21 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className={styles.emptyStateCell}>
                    No leads match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
