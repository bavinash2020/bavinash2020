import { useState } from 'react';
import { User, Check, X, FileText, Shield } from 'lucide-react';

export function AdminDashboard() {
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'Suresh Raina', age: 34, experience: '5 Yrs', status: 'pending', docIssues: false },
        { id: 2, name: 'Mohit Sharma', age: 29, experience: '3 Yrs', status: 'pending', docIssues: true },
        { id: 3, name: 'Priya Desai', age: 31, experience: '6 Yrs', status: 'verified', docIssues: false },
    ]);

    const handleVerify = (id: number, status: string) => {
        setDrivers(drivers.map(d => d.id === id ? { ...d, status } : d));
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Console</h1>
                <p>Platform Overview & document verification.</p>
            </div>

            <div className="stats-row">
                <div className="stat-box glass-panel">
                    <span className="label">Pending Verification</span>
                    <div className="value">{drivers.filter(d => d.status === 'pending').length}</div>
                </div>
                <div className="stat-box glass-panel">
                    <span className="label">Active Trips</span>
                    <div className="value">24</div>
                </div>
                <div className="stat-box glass-panel">
                    <span className="label">Total Revenue</span>
                    <div className="value">₹1.2L</div>
                </div>
            </div>

            <div className="verification-section">
                <h2>Driver Verification Queue (FR-16)</h2>
                <div className="drivers-list">
                    {drivers.map(driver => (
                        <div key={driver.id} className={`driver-row glass-panel ${driver.status}`}>
                            <div className="driver-info">
                                <div className="avatar-placeholder">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4>{driver.name}</h4>
                                    <p>{driver.age} yrs • {driver.experience} Exp</p>
                                </div>
                            </div>

                            <div className="doc-status">
                                <div className="doc-item">
                                    <FileText size={14} /> License
                                </div>
                                <div className="doc-item">
                                    <FileText size={14} /> Aadhaar
                                </div>
                                {driver.docIssues && <span className="issue-tag">Doc Issues</span>}
                            </div>

                            <div className="actions">
                                {driver.status === 'pending' ? (
                                    <>
                                        <button className="btn-icon reject" onClick={() => handleVerify(driver.id, 'rejected')}><X size={18} /></button>
                                        <button className="btn-icon approve" onClick={() => handleVerify(driver.id, 'verified')}><Check size={18} /></button>
                                    </>
                                ) : (
                                    <span className={`status-badge ${driver.status}`}>
                                        {driver.status === 'verified' ? <Shield size={14} /> : null} {driver.status}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .admin-container { max-width: 900px; margin: 0 auto; }
        .admin-header { margin-bottom: 2rem; }
        
        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 3rem; }
        .stat-box { padding: 1.5rem; text-align: center; }
        .stat-box .value { font-size: 2rem; font-weight: 700; color: var(--text-primary); }
        .stat-box .label { color: var(--text-secondary); font-size: 0.9rem; }
        
        .driver-row { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; margin-bottom: 1rem; transition: background 0.3s; }
        .driver-row.verified { border-left: 4px solid var(--success); opacity: 0.7; }
        .driver-row.rejected { border-left: 4px solid var(--error); opacity: 0.7; }
        .driver-row.pending { border-left: 4px solid var(--warning); }
        
        .driver-info { display: flex; align-items: center; gap: 1rem; width: 30%; }
        .avatar-placeholder { width: 40px; height: 40px; background: var(--bg-secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); }
        .driver-info h4 { font-size: 1rem; margin-bottom: 2px; }
        .driver-info p { font-size: 0.85rem; color: var(--text-secondary); }
        
        .doc-status { display: flex; gap: 1rem; color: var(--text-secondary); font-size: 0.85rem; }
        .doc-item { display: flex; align-items: center; gap: 6px; }
        .issue-tag { background: rgba(239, 68, 68, 0.2); color: var(--error); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; }
        
        .actions { display: flex; gap: 0.5rem; align-items: center; }
        .btn-icon { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; }
        .btn-icon.approve { color: var(--success); border-color: var(--success); }
        .btn-icon.approve:hover { background: var(--success); color: white; }
        .btn-icon.reject { color: var(--error); border-color: var(--error); }
        .btn-icon.reject:hover { background: var(--error); color: white; }
        
        .status-badge { display: flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 500; text-transform: capitalize; }
        .status-badge.verified { color: var(--success); }
        .status-badge.rejected { color: var(--error); }
      `}</style>
        </div>
    );
}
