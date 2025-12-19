import { useState } from 'react';
import { User, FileText, Upload, Save } from 'lucide-react';

export function DriverProfile() {
    const [activeTab, setActiveTab] = useState<'details' | 'documents'>('details');
    const [formData, setFormData] = useState({
        name: 'Rajesh Kumar',
        age: '34',
        experience: '8',
        languages: 'English, Hindi, Marathi',
        radius: '500',
        bio: 'Professional driver with 8 years of experience in luxury cars and long-distance trips.',
    });

    const handleSave = () => {
        alert('Profile saved successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Driver Profile</h1>
                <p>Manage your personal information and verification documents.</p>
            </div>

            <div className="glass-panel profile-content">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                    >
                        <User size={18} /> Personal Details
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                        onClick={() => setActiveTab('documents')}
                    >
                        <FileText size={18} /> Documents (FR-11)
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'details' ? (
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Experience (Years)</label>
                                <input
                                    type="number"
                                    value={formData.experience}
                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Languages Spoken</label>
                                <input
                                    type="text"
                                    value={formData.languages}
                                    onChange={e => setFormData({ ...formData, languages: e.target.value })}
                                    placeholder="e.g. English, Hindi"
                                />
                            </div>
                            <div className="form-group">
                                <label>Service Radius (km)</label>
                                <input
                                    type="number"
                                    value={formData.radius}
                                    onChange={e => setFormData({ ...formData, radius: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Bio / About Me</label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="documents-grid">
                            {['Driving License', 'Aadhaar Card', 'PAN Card', 'Police Verification'].map((doc) => (
                                <div key={doc} className="doc-card glass-panel-inner">
                                    <div className="doc-info">
                                        <h4>{doc}</h4>
                                        <span className="badge warning">Pending Verification</span>
                                    </div>
                                    <button className="btn btn-sm btn-secondary upload-btn">
                                        <Upload size={16} /> Upload
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} style={{ marginRight: 8 }} /> Save Changes
                    </button>
                </div>
            </div>

            <style>{`
        .profile-container { max-width: 800px; margin: 0 auto; }
        .profile-header { margin-bottom: 2rem; }
        .profile-content { padding: 0; overflow: hidden; }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0,0,0,0.2);
        }
        .tab-btn {
          flex: 1;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
        }
        .tab-btn:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: rgba(59, 130, 246, 0.05);
        }
        
        .tab-content { padding: 2rem; }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .full-width { grid-column: 1 / -1; }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
        }
        
        .documents-grid {
          display: grid;
          gap: 1rem;
        }
        .doc-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .badge {
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 8px;
        }
        .badge.warning { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
        .badge.success { background: rgba(16, 185, 129, 0.2); color: var(--success); }
        
        .form-actions {
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          background: rgba(0,0,0,0.1);
        }
      `}</style>
        </div>
    );
}
