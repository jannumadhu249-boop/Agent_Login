import { useState } from 'react';
import styles from '../styles/Page.module.css';

export default function CreateLeadPage({ onBack, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [documents, setDocuments] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Loan Requirements
    product: 'Home Loan',
    purpose: '',
    mobile: '',
    requiredLoanAmount: '',
    requiredTenure: '',
    leadSource: 'Website',
    
    // Step 2: Personal Details
    panNo: '',
    aadharNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    currentResidenceType: 'Owned',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    
    // Step 3: Business/Employment Details
    occupation: 'Salaried',
    companyType: '',
    companyName: '',
    loanEMI: '',
    
    // Salaried specific
    periodOfEmployment: '',
    retirementAge: '60',
    modeOfSalary: 'Bank Transfer',
    averageGrossSalary: '',
    netMonthlyIncome: '',
    anyOtherMonthlyIncome: '',
    
    // Self-employed specific
    businessSince: '',
    industry: '',
    gstNo: '',
    officeType: '',
    itrFiled: '',
    annualTurnover: '',
    netProfit: '',
    
    // Office address
    officeAddressLine1: '',
    officeAddressLine2: '',
    officeCity: '',
    officeState: '',
    officePincode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Document upload handlers
  const handleFileSelect = (e) => {
    addDocuments(Array.from(e.target.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addDocuments(Array.from(e.dataTransfer.files));
  };

  const addDocuments = (files) => {
    const newDocs = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
      uploadedAt: new Date(),
    }));
    setDocuments([...documents, ...newDocs]);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("word")) return "📝";
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
    return "📎";
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.mobile,
      product: formData.product,
      amount: formData.requiredLoanAmount,
      status: 'Lead Generated',
      date: new Date().toISOString().split('T')[0],
      color: '#3b82f6'
    };
    onSave(newLead);
    alert('Lead created successfully!');
    onBack();
  };

  const progressPercent = (currentStep / totalSteps) * 100;

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
            <h3 className={styles.headerTitle}>Create New Lead</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          width: '100%',
          height: '6px',
          background: '#e2e8f0',
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '999px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Form Card */}
      <div className={styles.card}>
        <form onSubmit={handleSubmit}>
          {/* Step 1: Loan Requirements */}
          {currentStep === 1 && (
            <div style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Loan Requirement Details
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
                Provide basic loan information
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Product *</label>
                  <select name="product" value={formData.product} onChange={handleChange} className={styles.formInput}>
                    <option>Home Loan</option>
                    <option>Car Loan</option>
                    <option>Personal Loan</option>
                    <option>Business Loan</option>
                    <option>Insurance</option>
                    <option>Education Loan</option>
                    <option>Loan Against Property</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Purpose</label>
                  <input type="text" name="purpose" value={formData.purpose} onChange={handleChange} 
                    className={styles.formInput} placeholder="e.g. House Purchase" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} 
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    className={styles.formInput} placeholder="10-digit mobile" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Required Loan Amount *</label>
                  <input type="number" name="requiredLoanAmount" value={formData.requiredLoanAmount} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter amount" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Required Tenure (Months) *</label>
                  <input type="number" name="requiredTenure" value={formData.requiredTenure} 
                    onChange={handleChange} className={styles.formInput} placeholder="e.g. 120" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Lead Source *</label>
                  <select name="leadSource" value={formData.leadSource} onChange={handleChange} className={styles.formInput}>
                    <option>Website</option>
                    <option>Referral</option>
                    <option>Phone Call</option>
                    <option>Walk-in</option>
                    <option>Social Media</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Details */}
          {currentStep === 2 && (
            <div style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Personal Details
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
                Primary applicant information
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>PAN Number *</label>
                  <input type="text" name="panNo" value={formData.panNo} 
                    onChange={(e) => setFormData({ ...formData, panNo: e.target.value.toUpperCase().slice(0, 10) })}
                    className={styles.formInput} placeholder="ABCDE1234F" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Aadhar Number *</label>
                  <input type="text" name="aadharNo" value={formData.aadharNo} 
                    onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                    className={styles.formInput} placeholder="12-digit Aadhar" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter first name" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Middle Name</label>
                  <input type="text" name="middleName" value={formData.middleName} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter middle name" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter last name" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" name="email" value={formData.email} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter email" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} 
                    onChange={handleChange} className={styles.formInput} />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={styles.formInput}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Residence Type *</label>
                  <select name="currentResidenceType" value={formData.currentResidenceType} onChange={handleChange} className={styles.formInput}>
                    <option>Owned</option>
                    <option>Rented</option>
                    <option>Company Provided</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Address Line 1 *</label>
                  <input type="text" name="addressLine1" value={formData.addressLine1} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter address" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Address Line 2</label>
                  <input type="text" name="addressLine2" value={formData.addressLine2} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter address" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>City *</label>
                  <input type="text" name="city" value={formData.city} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter city" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>State *</label>
                  <input type="text" name="state" value={formData.state} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter state" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} 
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className={styles.formInput} placeholder="6-digit pincode" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Business/Employment Details */}
          {currentStep === 3 && (
            <div style={{ padding: '32px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Primary Applicant
              </h4>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '32px' }}>
                Company / Business Details
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Occupation *</label>
                  <select name="occupation" value={formData.occupation} onChange={handleChange} className={styles.formInput}>
                    <option>Salaried</option>
                    <option>Self Employed</option>
                  </select>
                </div>

                {formData.occupation === 'Salaried' && (
                  <>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Period of Employment</label>
                      <input type="text" name="periodOfEmployment" value={formData.periodOfEmployment} 
                        onChange={handleChange} className={styles.formInput} placeholder="e.g. 2 years" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Mode of Salary</label>
                      <select name="modeOfSalary" value={formData.modeOfSalary} onChange={handleChange} className={styles.formInput}>
                        <option>Bank Transfer</option>
                        <option>Cash</option>
                        <option>Cheque</option>
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Average Gross Salary *</label>
                      <input type="number" name="averageGrossSalary" value={formData.averageGrossSalary} 
                        onChange={handleChange} className={styles.formInput} placeholder="Enter amount" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Net Monthly Income *</label>
                      <input type="number" name="netMonthlyIncome" value={formData.netMonthlyIncome} 
                        onChange={handleChange} className={styles.formInput} placeholder="Enter income" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Any Other Monthly Income</label>
                      <input type="number" name="anyOtherMonthlyIncome" value={formData.anyOtherMonthlyIncome} 
                        onChange={handleChange} className={styles.formInput} placeholder="0" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Retirement Age</label>
                      <input type="number" name="retirementAge" value={formData.retirementAge} 
                        onChange={handleChange} className={styles.formInput} placeholder="60" />
                    </div>
                  </>
                )}

                {formData.occupation === 'Self Employed' && (
                  <>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>In Business Since (Months)</label>
                      <input type="number" name="businessSince" value={formData.businessSince} 
                        onChange={handleChange} className={styles.formInput} placeholder="e.g. 24" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Industry</label>
                      <input type="text" name="industry" value={formData.industry} 
                        onChange={handleChange} className={styles.formInput} placeholder="e.g. IT, Manufacturing" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>GST Number</label>
                      <input type="text" name="gstNo" value={formData.gstNo} 
                        onChange={handleChange} className={styles.formInput} placeholder="Enter GSTIN" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Office Type</label>
                      <select name="officeType" value={formData.officeType} onChange={handleChange} className={styles.formInput}>
                        <option value="">Select type</option>
                        <option>Owned</option>
                        <option>Rented</option>
                      </select>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>ITR Filed In Years</label>
                      <input type="number" name="itrFiled" value={formData.itrFiled} 
                        onChange={handleChange} className={styles.formInput} placeholder="e.g. 3" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Annual Turnover *</label>
                      <input type="number" name="annualTurnover" value={formData.annualTurnover} 
                        onChange={handleChange} className={styles.formInput} placeholder="Enter turnover" />
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Net Profit *</label>
                      <input type="number" name="netProfit" value={formData.netProfit} 
                        onChange={handleChange} className={styles.formInput} placeholder="Enter profit" />
                    </div>
                  </>
                )}

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Company Type</label>
                  <select name="companyType" value={formData.companyType} onChange={handleChange} className={styles.formInput}>
                    <option value="">Select type</option>
                    <option>Private Limited</option>
                    <option>Public Limited</option>
                    <option>Partnership</option>
                    <option>Proprietorship</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Company / Business Name</label>
                  <input type="text" name="companyName" value={formData.companyName} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter company name" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Loan EMI / Obligations</label>
                  <input type="number" name="loanEMI" value={formData.loanEMI} 
                    onChange={handleChange} className={styles.formInput} placeholder="0" />
                </div>

                <div className={styles.inputGroup} style={{ gridColumn: '1 / -1' }}>
                  <h5 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginTop: '24px', marginBottom: '16px' }}>
                    Office Address
                  </h5>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Office Address Line 1</label>
                  <input type="text" name="officeAddressLine1" value={formData.officeAddressLine1} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter office address" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Office Address Line 2</label>
                  <input type="text" name="officeAddressLine2" value={formData.officeAddressLine2} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter office address" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Office City</label>
                  <input type="text" name="officeCity" value={formData.officeCity} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter city" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Office State</label>
                  <input type="text" name="officeState" value={formData.officeState} 
                    onChange={handleChange} className={styles.formInput} placeholder="Enter state" />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Office Pincode</label>
                  <input type="text" name="officePincode" value={formData.officePincode} 
                    onChange={(e) => setFormData({ ...formData, officePincode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className={styles.formInput} placeholder="6-digit pincode" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    Primary Applicant ({formData.firstName || 'Applicant'})
                  </h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                    Upload supporting documents
                  </p>
                </div>
                <label htmlFor="file-upload-btn" style={{ margin: 0 }}>
                  <input
                    id="file-upload-btn"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById('file-upload-btn').click()}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Document
                  </button>
                </label>
              </div>

              {documents.length === 0 ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: isDragging ? '2px dashed #6366f1' : '2px dashed #cbd5e1',
                    borderRadius: '20px',
                    padding: '60px 20px',
                    textAlign: 'center',
                    background: isDragging ? '#f5f3ff' : '#fefefe',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>☁️</div>
                  <p style={{ color: '#64748b', marginBottom: '8px', fontSize: '15px' }}>
                    Drag & drop files here or click to browse
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '20px' }}>
                    Supports PDF, DOC, JPG, PNG, XLS (max 10MB)
                  </p>
                  <label htmlFor="file-upload-main" style={{ margin: 0 }}>
                    <input
                      id="file-upload-main"
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('file-upload-main').click()}
                      style={{
                        padding: '12px 32px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Select Files
                    </button>
                  </label>
                </div>
              ) : (
                <>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                      border: isDragging ? '2px dashed #6366f1' : '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center',
                      background: isDragging ? '#f5f3ff' : '#fefefe',
                      transition: 'all 0.2s',
                      marginBottom: '20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Drop more files here
                  </div>

                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '12px',
                          background: '#f8fafc',
                          marginBottom: '12px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontSize: '32px', marginRight: '16px' }}>
                          {getFileIcon(doc.type)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500, marginBottom: '4px', fontSize: '14px', color: '#0f172a' }}>
                            {doc.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '16px' }}>
                            <span>{formatFileSize(doc.size)}</span>
                            <span>{doc.uploadedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(doc.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '8px',
                            fontSize: '20px'
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ padding: '24px 32px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: '#fff',
                color: '#64748b',
                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                opacity: currentStep === 1 ? 0.5 : 1
              }}
            >
              Previous
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    padding: '10px 32px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                >
                  Save & Proceed
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onBack}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      border: '1px solid #ef4444',
                      background: '#fff',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    Reject
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 32px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    Proceed
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
