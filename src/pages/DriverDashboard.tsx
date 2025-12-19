import { useState } from 'react';
import { Power, MapPin, Calendar, Check, X } from 'lucide-react';

export function DriverDashboard() {
    const [isAvailable, setIsAvailable] = useState(true);
    const [requests, setRequests] = useState([
        {
            id: 1,
            customer: 'Rahul Verma',
            pickup: 'Mumbai',
            drop: 'Pune',
            date: '2025-10-15',
            duration: '3 Days',
            amount: '₹4,500',
            status: 'pending'
        },
        {
            id: 2,
            customer: 'Sneha Gupta',
            pickup: 'Bandra West',
            drop: 'Lonavala',
            date: '2025-10-18',
            duration: '2 Days',
            amount: '₹3,000',
            status: 'pending'
        }
    ]);

    const handleStatusChange = (id: number, newStatus: string) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    return (
        <div className="dashboard-container">
            {/* Availability Status Bar */}
            <div className={`status-bar glass-panel ${isAvailable ? 'available' : 'unavailable'}`}>
                <div className="status-info">
                    <h3>You are currently {isAvailable ? 'Online' : 'Offline'}</h3>
                    <p>{isAvailable ? 'You can receive new trip requests.' : 'Go online to start earning.'}</p>
                </div>
                <button
                    className="toggle-btn"
                    onClick={() => setIsAvailable(!isAvailable)}
                >
                    <Power size={24} />
                </button>
            </div>

            {/* Stats Summary */}
            <div className="stats-grid">
                <div className="stat-card glass-panel">
                    <span className="stat-label">Today's Earnings</span>
                    <div className="stat-value">₹1,200</div>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-label">Trips This Month</span>
                    <div className="stat-value">12</div>
                </div>
                <div className="stat-card glass-panel">
                    <span className="stat-label">Rating</span>
                    <div className="stat-value">4.8 <span className="star">★</span></div>
                </div>
            </div>

            {/* Incoming Requests */}
            <div className="section-header">
                <h2>Incoming Requests</h2>
            </div>

            <div className="requests-list">
                {requests.filter(r => r.status === 'pending').length === 0 && (
                    <p className="empty-state">No pending requests at the moment.</p>
                )}

                {requests.map(request => (
                    request.status === 'pending' && (
                        <div key={request.id} className="request-card glass-panel">
                            <div className="request-header">
                                <div className="customer-info">
                                    <h4>{request.customer}</h4>
                                    <span className="trip-type">Round Trip</span>
                                </div>
                                <div className="trip-amount">{request.amount}</div>
                            </div>

                            <div className="trip-details">
                                <div className="detail-item">
                                    <MapPin size={16} />
                                    <span>{request.pickup} ➝ {request.drop}</span>
                                </div>
                                <div className="detail-item">
                                    <Calendar size={16} />
                                    <span>{request.date} ({request.duration})</span>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="btn btn-reject"
                                    onClick={() => handleStatusChange(request.id, 'rejected')}
                                >
                                    <X size={18} /> Reject
                                </button>
                                <button
                                    className="btn btn-accept"
                                    onClick={() => handleStatusChange(request.id, 'accepted')}
                                >
                                    <Check size={18} /> Accept
                                </button>
                            </div>
                        </div>
                    )
                ))}
            </div>

            <style>{`
        .dashboard-container { max-width: 800px; margin: 0 auto; }
        
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
          border-left: 4px solid;
          transition: all 0.3s;
        }
        .status-bar.available { border-color: var(--success); background: rgba(16, 185, 129, 0.1); }
        .status-bar.unavailable { border-color: var(--text-muted); background: rgba(100, 116, 139, 0.1); }
        
        .status-info h3 { margin-bottom: 0.25rem; }
        .status-info p { color: var(--text-secondary); font-size: 0.9rem; }
        
        .toggle-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.2s;
        }
        .available .toggle-btn { color: var(--success); box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
        .unavailable .toggle-btn:hover { color: var(--text-primary); }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
        }
        .stat-card { padding: 1.5rem; text-align: center; }
        .stat-label { display: block; color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem; }
        .stat-value { font-size: 2rem; font-weight: 700; color: var(--text-primary); }
        .star { color: var(--warning); }

        .section-header { margin-bottom: 1.5rem; }
        
        .requests-list { display: flex; flex-direction: column; gap: 1rem; }
        
        .request-card { padding: 1.5rem; border-left: 4px solid var(--primary); }
        
        .request-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .customer-info h4 { font-size: 1.1rem; margin-bottom: 0.25rem; }
        .trip-type { font-size: 0.8rem; background: rgba(59, 130, 246, 0.1); color: var(--primary); padding: 2px 6px; border-radius: 4px; }
        .trip-amount { font-size: 1.25rem; font-weight: 700; color: var(--success); }
        
        .trip-details { display: grid; gap: 0.5rem; margin-bottom: 1.5rem; }
        .detail-item { display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary); }
        
        .action-buttons { display: flex; gap: 1rem; }
        .action-buttons .btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.75rem; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
        
        .btn-accept { background: var(--success); color: white; }
        .btn-accept:hover { background: #059669; }
        
        .btn-reject { background: transparent; border: 1px solid var(--error); color: var(--error); }
        .btn-reject:hover { background: rgba(239, 68, 68, 0.1); }
        
        .empty-state { text-align: center; color: var(--text-secondary); padding: 2rem; font-style: italic; }
      `}</style>
        </div>
    );
}
