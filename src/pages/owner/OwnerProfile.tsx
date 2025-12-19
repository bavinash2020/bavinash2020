import { useState } from 'react';
import { User, Save, MapPin, Phone } from 'lucide-react';

export function OwnerProfile() {
    const [formData, setFormData] = useState({
        name: 'Anjali Sharma',
        city: 'Mumbai',
        language: 'English, Hindi',
        emergencyContact: '9876500000',
        email: 'anjali@example.com'
    });

    const handleSave = () => {
        alert('Profile saved successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Customer Profile</h1>
                <p>Update your personal details and preferences.</p>
            </div>

            <div className="glass-panel profile-content">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-wrapper">
                            <User size={16} className="input-icon" />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>City / Location</label>
                        <div className="input-wrapper">
                            <MapPin size={16} className="input-icon" />
                            <input
                                type="text"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Preferred Languages</label>
                        <input
                            type="text"
                            value={formData.language}
                            onChange={e => setFormData({ ...formData, language: e.target.value })}
                            placeholder="e.g. English, Hindi"
                        />
                    </div>

                    <div className="form-group">
                        <label>Emergency Contact</label>
                        <div className="input-wrapper">
                            <Phone size={16} className="input-icon" />
                            <input
                                type="tel"
                                value={formData.emergencyContact}
                                onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} style={{ marginRight: 8 }} /> Save Changes
                    </button>
                </div>
            </div>

            <style>{`
        .profile-container { max-width: 600px; margin: 0 auto; }
        .profile-header { margin-bottom: 2rem; text-align: center; }
        .profile-content { padding: 2rem; }
        
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
        
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          padding-left: 2.5rem; /* Space for icon */
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
        }
        
        /* Adjust padding if no icon wrapper */
        .form-group > input {
           padding-left: 0.75rem;
        }

        .form-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
        </div>
    );
}
